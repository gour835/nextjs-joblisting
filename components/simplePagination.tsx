/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { useEffect, useState } from "react";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';


export default function SimplePagination({ total = 1 }) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { replace } = useRouter();
    const [active, setActive] = useState(() => {
        const pageNumber = searchParams.get('page');
        return pageNumber && Number(pageNumber) > 0 ? Number(pageNumber) : 1;
    });
    const [input, setInput] = useState(active);

    useEffect(() => {
        const pageNumber = searchParams.get('page');
        const pageNum = pageNumber ? Number(pageNumber) : 1;
        if (pageNum > 0 && pageNum !== active) {
            setActive(pageNum);
        }
    }, [searchParams]);

   

    const createQueryString = (name: string, value: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, `${value}`);
        return params.toString();
    };

    const next = () => {
        if (active >= total) return;
        const newPage = active + 1;
        setActive(newPage);
        replace(`${pathname}?${createQueryString('page', newPage)}`);
    };

    const prev = () => {
        if (active <= 1) return;
        const newPage = active - 1;
        setActive(newPage);

        const params = new URLSearchParams(searchParams.toString());
        if (newPage === 1) {
            params.delete('page'); // Clean up URL if it's page 1
        } else {
            params.set('page', `${newPage}`);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleSearch = useDebouncedCallback((term: string) => {
        const newPage = Number(term);
        if(total < newPage) return
        setActive(newPage);

        const params = new URLSearchParams(searchParams.toString());
        if (newPage === 1) {
            params.delete('page'); // Clean up URL if it's page 1
        } else {
            params.set('page', `${newPage}`);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 600);

     // when the input is changed then run the handle search function
    useEffect(()=>{
        handleSearch(`${input}`)
    }, [input])

    return (
        <>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={prev} />
                    </PaginationItem>

                    <div className="flex flex-row gap-2.5 px-1 my-1.5 justify-center items-center bg-gray-800 p-1 rounded-2xl">

                        <Field orientation="horizontal" className="w-fit">
                            <FieldLabel htmlFor="select-rows-per-page">Page No:</FieldLabel>
                            <Input type="tel" min={0} max={total} value={input} onChange={(e) => {

                                // handleSearch(e.target.value)
                                setInput(Number(e.target.value));

                            }} className="w-18" />
                        </Field>

                        <PaginationItem>
                            of
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink >{total}</PaginationLink>
                        </PaginationItem>

                    </div>
                    <PaginationItem>
                        <PaginationNext onClick={next} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

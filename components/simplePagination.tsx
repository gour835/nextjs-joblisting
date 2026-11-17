'use client';
import { useState } from "react";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";


export default function SimplePagination({total = 1}) {
    const [page, setPage] = useState(0);
    return (
        <>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>

                    <div className="flex flex-row gap-2.5 px-1 my-1.5 justify-center items-center bg-gray-800 p-1 rounded-2xl">

                    <Field orientation="horizontal" className="w-fit">
                        <FieldLabel htmlFor="select-rows-per-page">Page No:</FieldLabel>
                        <Input type="number" min={0} max={total} className="w-20"/>
                    </Field>

                    <PaginationItem>
                        of
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink >{total}</PaginationLink>
                    </PaginationItem>

                    </div>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

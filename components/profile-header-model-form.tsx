import { getUserInfo } from "@/app/action/profile"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { ImageUp } from "lucide-react"

const months = [
    { label: "MM", value: null },
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
]

const years = [
    { label: "YYYY", value: null },
    { label: "2024", value: "2024" },
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
    { label: "2027", value: "2027" },
    { label: "2028", value: "2028" },
    { label: "2029", value: "2029" },
]

export function ProfileHeaderModelForm() {

    const { data, status } = useSession()
    const [category, setCategory] = useState<string | null>();
    const [username, setUsername] = useState<string | null>();
    const [email, setEmail] = useState<string | null>();
    const [image, setImage] = useState<string | null>();
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (status === "loading") return;

        const email = data?.user?.email || '';
        if (!email) return;

        let cancelled = false;

        async function fetchUserJoiningDate() {
            const response = await getUserInfo(email);
            if (cancelled) return;

            if (!response.success) {
                toast.error("Error getting user details");
                console.log(response.error);
                return;
            }

            setCategory(response.user?.category);
            setUsername(response.user?.username);
            setEmail(response.user?.email);
            setImage(response.user?.image);
        }

        fetchUserJoiningDate();

        return () => {
            cancelled = true;
        };
    }, [data?.user?.email, status])
    return (
        <div className="w-full mx-auto max-w-md">

            <form>
                <FieldGroup>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    Email:
                                </FieldLabel>
                                <Input
                                    id="email"
                                    placeholder="EvilRabbit@gmail.com"
                                    value={email ?? ''}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="username">
                                    Username:
                                </FieldLabel>
                                <Input
                                    id="username"
                                    placeholder="EvilRabit@123"
                                    value={username ?? ''}
                                    required
                                />
                            </Field>
                            <FieldSet className="w-full">
                                <FieldLegend variant="label">Which Describes you the best:</FieldLegend>
                                <RadioGroup
                                    value={category ?? 'developer'}
                                    name="category"
                                    disabled
                                    aria-disabled
                                    className="w-full cursor-no-drop">
                                    <FieldLabel htmlFor="developer" className="cursor-no-drop">
                                        <Field orientation="horizontal">
                                            <FieldContent>
                                                <FieldTitle>Developer</FieldTitle>
                                                <FieldDescription>
                                                    For individuals who wants to be Hired.
                                                </FieldDescription>
                                            </FieldContent>
                                            <RadioGroupItem value="developer" id="developer" />
                                        </Field>
                                    </FieldLabel>
                                    <FieldLabel htmlFor="recruiter" className="cursor-no-drop">
                                        <Field orientation="horizontal">
                                            <FieldContent>
                                                <FieldTitle>Recruiter</FieldTitle>
                                                <FieldDescription>For individuals or firms who wants to Hire.</FieldDescription>
                                            </FieldContent>
                                            <RadioGroupItem value="recruiter" id="recruiter" />
                                        </Field>

                                    </FieldLabel>

                                </RadioGroup>
                                <FieldDescription>
                                    To Change this please contact the support or delete and register again
                                </FieldDescription>
                            </FieldSet>

                        </FieldGroup>
                    </FieldSet>
                    <FieldSeparator />
                    <FieldSet className="">

                        <Input
                            ref={fileInputRef}
                            id="picture"
                            type="file"
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            className="absolute top-56 left-14 rounded-full w-fit h-fit p-1 bg-gray-200/70 backdrop-blur-md hover:bg-gray-400/80 transition-colors"
                            type="button"
                            onClick={() => {
                                fileInputRef.current?.click();
                            }}
                        >
                            <ImageUp className="w-5" />
                        </button>

                    </FieldSet>


                </FieldGroup>
            </form>
        </div>
    )
}

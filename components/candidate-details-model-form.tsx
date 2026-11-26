import { getUserInfo } from "@/app/action/profile"
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
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Eye, EyeClosed, ImageUp } from "lucide-react"
import { Textarea } from "./ui/textarea"
import CustomLookEmailInput from "./tagify"

export function CandidateDetailsModelForm() {

    const { data, status } = useSession()
    const [category, setCategory] = useState<string | null>();
    const [username, setUsername] = useState<string | null>();
    const [email, setEmail] = useState<string | null>();
    const [image, setImage] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [visible, setvisible] = useState<boolean>(false);

    

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
                                    Description:
                                </FieldLabel>
                                <Textarea
                                    key={email ?? ''}
                                    id="email"
                                    placeholder="Tell us about yourself"
                                    defaultValue={email ?? ''}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="username">
                                    Username:
                                </FieldLabel>
                                <Input
                                    key={username ?? ''}
                                    id="username"
                                    placeholder="EvilRabit@123"
                                    defaultValue={username ?? ''}
                                    required
                                />
                            </Field>
                            <Field className="relative">
                                <FieldLabel htmlFor="password">
                                    Password:
                                </FieldLabel>
                                <Input
                                    id="password"
                                    placeholder="EvilRabit@123"
                                    type={`${visible ? 'text' : 'password'}`}
                                    
                                    required
                                />
                                <Eye
                                    className={`!w-8 rounded-full hover:text-black absolute top-9 right-4 hover:bg-gray-300 ${!visible && 'hidden'}`}
                                    onClick={()=>{
                                        setvisible(false)
                                    }}
                                />
                                <EyeClosed
                                    className={`!w-8 rounded-full hover:text-black absolute top-9 right-4 hover:bg-gray-300 ${visible && 'hidden'}`}
                                    onClick={()=>{
                                        setvisible(true)
                                    }}
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
                                    To Change this please contact the support or delete your account and register again
                                </FieldDescription>
                            </FieldSet>

                        </FieldGroup>

                        <CustomLookEmailInput/>
                    </FieldSet>
                    <FieldSeparator />
                    


                </FieldGroup>
            </form>
        </div>
    )
}

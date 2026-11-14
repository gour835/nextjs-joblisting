import { getUsers } from "../action/action"

interface UserProps{
    email: string;
    username: string;
    id: string
}
export default async function page() {
    const UserResponse = await getUsers();

    if (!UserResponse.success){
        console.log(UserResponse?.error);
    }else{
        console.log(UserResponse?.users);
    }

  return (
    <div>page</div>
  )
}


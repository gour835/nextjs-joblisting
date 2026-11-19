import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function CardImage({title}: {title: string}) {
  return (
    <Card className="relative bg-white mx-auto w-full max-w-sm pt-0 rounded-tl rounded-br shadow-2xl shadow-mauve-600">
      <div className="absolute inset-0 z-30 aspect-video  border-2 border-b-0" />
      <img
        src="https://campaigns.digitmoney.in/image/partners/abc.png"
        alt="Event cover"
        className="relative z-20 aspect-video w-[35%] object-contain  rounded-b-lg "
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Urgent Hiring</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Apply</Button>
      </CardFooter>
    </Card>
  )
}

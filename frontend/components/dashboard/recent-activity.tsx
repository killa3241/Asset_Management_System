import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    id: 1,
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/placeholder.svg",
      initials: "JD",
    },
    action: "assigned",
    asset: 'MacBook Pro 16"',
    timestamp: "2 minutes ago",
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "/placeholder.svg",
      initials: "JS",
    },
    action: "returned",
    asset: "iPhone 13 Pro",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    user: {
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      avatar: "/placeholder.svg",
      initials: "RJ",
    },
    action: "requested maintenance for",
    asset: "Dell XPS 15",
    timestamp: "3 hours ago",
  },
  {
    id: 4,
    user: {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "/placeholder.svg",
      initials: "ED",
    },
    action: "requested",
    asset: 'iPad Pro 12.9"',
    timestamp: "5 hours ago",
  },
  {
    id: 5,
    user: {
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      avatar: "/placeholder.svg",
      initials: "MW",
    },
    action: "disposed",
    asset: "HP Printer",
    timestamp: "1 day ago",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions performed in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.action} <span className="font-medium">{activity.asset}</span>
                </p>
              </div>
              <div className="ml-auto font-medium text-xs text-muted-foreground">{activity.timestamp}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


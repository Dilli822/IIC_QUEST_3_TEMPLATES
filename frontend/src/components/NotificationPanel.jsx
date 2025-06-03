import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

function NotificationPanel({ notifications }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:outline-0">
        <button className="relative border-0">
          <Bell className="h-6 w-6" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
              {notifications.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-2 z-100">
        <ScrollArea className="h-64 pr-2">
          {notifications.length === 0 ? (
            <div className="text-sm text-center text-gray-500 py-4">
              No new notifications
            </div>
          ) : (
            notifications.map((noti, index) => (
              <DropdownMenuItem key={index} className="whitespace-normal py-2">
                <div>
                  <p className="text-sm text-gray-800">{noti.message}</p>
                  <p className="text-xs text-gray-400">
                    {noti.time || "Just now"}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationPanel;

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export function Support() {
  return (
    <div className="bg-[#0D1D22] p-8 rounded-xl shadow-md ">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Support
          </h2>
          <p className="text-muted-foreground">
            Get help and view the current system status.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Phone className="w-4 h-4 mr-2" />
          Contact Support
        </Button>
      </div>
    </div>
  );
}

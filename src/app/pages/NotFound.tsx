import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#0A70A1] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-[#0A70A1] hover:bg-[#085a85]">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

const AuthPromptPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Please log in to proceed
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground">
            Please log in to proceed with your booking. If you don't have an account, you can sign up here.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link to="/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPromptPage;
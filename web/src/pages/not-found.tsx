import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router'

export default function NotFound() {
    return (
        <div className="min-h-screen">
            <div className="flex items-center justify-center p-8">
                <Card className="max-w-md w-full text-center">
                    <CardHeader>
                        <div className="text-6xl font-bold text-muted-foreground mb-4">
                            404
                        </div>
                        <CardTitle className="text-2xl mb-2">
                            Page Not Found
                        </CardTitle>
                        <CardDescription className="text-base">
                            The page you're looking for doesn't exist or has been moved.
                        </CardDescription>
                    </CardHeader>
                    <div className="p-6 pt-0 space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Don't worry, let's get you back to exploring our coffee beans!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link to="/">
                                <Button>
                                    Go Home
                                </Button>
                            </Link>
                            <Link to="/beans">
                                <Button variant="outline">
                                    Browse Beans
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

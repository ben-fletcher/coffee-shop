import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import type { Bean } from '@/models/bean'
import BeanCard from '@/components/BeanCard'

export default function Home() {
    const { data: beans } = useQuery({
        queryKey: ['beans'],
        queryFn: () => fetch('http://localhost:8080/beans').then(res => res.json())
    })

    // Get featured beans (first 3)
    const featuredBeans = beans?.slice(0, 3) || []

    return (
        <>
            <div>
                {/* Hero Section */}
                <section className="relative w-full overflow-hidden h-80">
                    <div className="bg-primary absolute inset-0 z-30 opacity-50 mix-blend-color" />
                    <img
                        src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Coffee beans"
                        className="relative z-20 h-full w-full object-cover brightness-60 grayscale"
                    />
                    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-6 text-center">
                        <h1 className="text-3xl font-semibold text-white mb-3 drop-shadow-md">
                            Welcome to Coffee Shop
                        </h1>
                        <p className="text-lg text-white mb-6 max-w-2xl drop-shadow-sm">
                            Discover the finest selection of premium coffee beans from around the world
                        </p>
                        <Link to="/beans">
                            <Button className="bg-white text-primary hover:bg-gray-100" size="lg">
                                Explore Our Beans
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Featured Beans Section */}
                <section className="p-8 max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">Featured Beans</h2>
                        <p className="text-muted-foreground">
                            Handpicked selections from our collection
                        </p>
                    </div>

                    {featuredBeans.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {featuredBeans.map((bean: Bean) => (
                                <BeanCard key={bean.id} bean={bean} />
                            ))}
                        </div>
                    ) : (
                        <Card className="p-8 text-center">
                            <CardHeader>
                                <CardTitle>No beans available</CardTitle>
                                <CardDescription>
                                    Check back soon for our featured selection
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    )}

                    {beans && beans.length > 3 && (
                        <div className="text-center">
                            <Link to="/beans">
                                <Button variant="outline" size="lg">
                                    View All Beans ({beans.length})
                                </Button>
                            </Link>
                        </div>
                    )}
                </section>

                {/* About Section */}
                <section className="bg-muted p-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">About Our Coffee</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We source the finest coffee beans from renowned regions around the world. 
                            Each bean is carefully selected and roasted to perfection, ensuring a 
                            unique and memorable coffee experience. Whether you prefer a bold espresso 
                            or a smooth pour-over, we have the perfect beans for your taste.
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}

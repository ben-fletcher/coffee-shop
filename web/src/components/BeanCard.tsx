import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import type { Bean } from '@/models/bean'
import { Link } from 'react-router'
import { Button } from './ui/button';

export default function BeanCard({ bean }: { bean: Bean }) {
    return (
        <Link to={`/beans/${bean.id}`}>
            <Card className="relative w-full max-w-sm overflow-hidden pt-0 cursor-pointer">
                <div className="bg-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color" />
                <img
                    src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Coffee beans"
                    className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
                />
                <CardHeader>
                    <CardTitle>{bean.name}</CardTitle>
                    <CardDescription>{bean.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                    }}>Add to Cart</Button>
                </CardFooter>
            </Card>
        </Link>
    )
}

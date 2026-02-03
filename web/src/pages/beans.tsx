import { useQuery } from '@tanstack/react-query'
import type { Bean } from '@/models/bean'
import BeanCard from '@/components/BeanCard'

export default function Beans() {
    const { data: beans } = useQuery({
        queryKey: ['beans'],
        queryFn: () => fetch('http://localhost:8080/api/beans').then(res => res.json())
    })
    return (
        <>
            <div className="p-8">
                <h1 className="text-2xl font-bold">Beans</h1>
                <p className="text-sm text-gray-500">Browse our collection of coffee beans</p>

                <div className="flex flex-wrap gap-4 mt-4">
                    {beans?.map((bean: Bean) => <BeanCard key={bean.id} bean={bean} />)}
                </div>
            </div>
        </>
    )
}

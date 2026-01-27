import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router'
import type { Bean } from '@/models/bean'
import { useState } from 'react'

export default function BeanDetails() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [quantity, setQuantity] = useState(1)
    const [purchaseSuccess, setPurchaseSuccess] = useState(false)

    const { data: bean, isLoading, error } = useQuery<Bean>({
        queryKey: ['bean', id],
        queryFn: () => fetch(`http://localhost:8080/beans/${id}`).then(res => {
            if (!res.ok) {
                throw new Error('Bean not found')
            }
            return res.json()
        }),
        enabled: !!id,
    })

    const purchaseMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:8080/beans/${id}/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            })
            if (!response.ok) {
                throw new Error('Purchase failed')
            }
            return response.json()
        },
        onSuccess: () => {
            setPurchaseSuccess(true)
            queryClient.invalidateQueries({ queryKey: ['bean', id] })
            setTimeout(() => {
                setPurchaseSuccess(false)
            }, 3000)
        },
    })

    const handlePurchase = () => {
        purchaseMutation.mutate()
    }

    if (isLoading) {
        return (
            <>
                <div className="p-4">
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Loading bean details...</p>
                    </div>
                </div>
            </>
        )
    }

    if (error || !bean) {
        return (
            <>
                <div className="p-4">
                    <Card className="max-w-2xl mx-auto mt-8">
                        <CardHeader>
                            <CardTitle>Bean Not Found</CardTitle>
                            <CardDescription>
                                The bean you're looking for doesn't exist.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={() => navigate('/beans')} variant="outline">
                                Back to Beans
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="p-4 max-w-6xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/beans')}
                    className="mb-4"
                >
                    ← Back to Beans
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                    {/* Image Section */}
                    <div className="relative w-full overflow-hidden rounded-lg">
                        <div className="bg-primary absolute inset-0 z-30 aspect-square opacity-50 mix-blend-color" />
                        <img
                            src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt={bean.name}
                            className="relative z-20 aspect-square w-full object-cover brightness-60 grayscale"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col">
                        <Card className="flex-1">
                            <CardHeader>
                                <CardTitle className="text-3xl mb-2">{bean.name}</CardTitle>
                                <CardDescription className="text-base">
                                    {bean.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Quantity Selector */}
                                <div className="space-y-2">
                                    <label htmlFor="quantity" className="text-sm font-medium">
                                        Quantity
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            −
                                        </Button>
                                        <input
                                            id="quantity"
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value) || 1
                                                setQuantity(Math.max(1, val))
                                            }}
                                            className="w-20 text-center border rounded-md px-3 py-2"
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>

                                {/* Purchase Button */}
                                {purchaseSuccess ? (
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                                        <p className="text-green-800 dark:text-green-200 font-medium">
                                            ✓ Purchase successful! Thank you for your order.
                                        </p>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={handlePurchase}
                                        disabled={purchaseMutation.isPending}
                                        size="lg"
                                        className="w-full"
                                    >
                                        {purchaseMutation.isPending ? 'Processing...' : `Buy ${quantity} ${quantity === 1 ? 'bag' : 'bags'}`}
                                    </Button>
                                )}

                                {purchaseMutation.isError && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                        <p className="text-red-800 dark:text-red-200 text-sm">
                                            Failed to complete purchase. Please try again.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

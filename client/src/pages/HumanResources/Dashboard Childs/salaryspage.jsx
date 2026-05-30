import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRSalaries, HandlePatchHRSalaries } from "../../../redux/Thunks/HRSalariesThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { useToast } from "../../../hooks/use-toast.js"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const HRSalariesPage = () => {
    const dispatch = useDispatch()
    const HRSalariesState = useSelector((state) => state.HRSalariesPageReducer)
    const [updatingId, setUpdatingId] = useState(null)
    const { toast } = useToast()

    useEffect(() => {
        dispatch(HandleGetHRSalaries({ apiroute: "GETALL" }))
    }, [dispatch])

    const handleSalaryStatus = async (salaryID, status) => {
        setUpdatingId(salaryID)
        try {
            const salary = HRSalariesState.data?.data?.find((item) => item._id === salaryID)
            if (!salary) throw new Error("Salary record not found")

            const bonusPercentage = salary.basicpay ? (salary.bonuses / salary.basicpay) * 100 : 0
            const deductionPercentage = salary.basicpay ? (salary.deductions / salary.basicpay) * 100 : 0

            await dispatch(HandlePatchHRSalaries({
                apiroute: "UPDATE",
                data: {
                    salaryID,
                    basicpay: salary.basicpay,
                    bonusePT: bonusPercentage,
                    deductionPT: deductionPercentage,
                    duedate: salary.duedate,
                    currency: salary.currency,
                    status,
                }
            })).unwrap()
            toast({ title: "Salary updated", description: `Salary status set to ${status}.` })
            await dispatch(HandleGetHRSalaries({ apiroute: "GETALL" }))
        } catch (error) {
            toast({ variant: "destructive", title: "Unable to update salary", description: error?.message || "Please try again." })
        } finally {
            setUpdatingId(null)
        }
    }

    if (HRSalariesState.isLoading) {
        return <Loading />
    }

    const salaries = HRSalariesState.data?.data ?? []

    return (
        <div className="salaries-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%] bg-blue-50 rounded-3xl p-5 shadow-xl border border-blue-200">
            <div className="page-heading flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-blue-900">Salaries</h1>
                <p className="text-sm text-blue-700">View salary records, payment due dates, and payout details.</p>
            </div>
            <div className="overflow-auto rounded-3xl border border-blue-200 bg-white p-4 shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Basic Pay</TableHead>
                            <TableHead>Bonuses</TableHead>
                            <TableHead>Deductions</TableHead>
                            <TableHead>Net Pay</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {salaries.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-6 text-sm text-muted-foreground">
                                    No salary records found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            salaries.map((salary) => (
                                <TableRow key={salary._id}>
                                    <TableCell>{salary.employee ? `${salary.employee.firstname} ${salary.employee.lastname}` : "Unknown"}</TableCell>
                                    <TableCell>{salary.basicpay}</TableCell>
                                    <TableCell>{salary.bonuses}</TableCell>
                                    <TableCell>{salary.deductions}</TableCell>
                                    <TableCell>{salary.netpay}</TableCell>
                                    <TableCell>{salary.status}</TableCell>
                                    <TableCell>{new Date(salary.duedate).toLocaleDateString()}</TableCell>
                                    <TableCell className="flex flex-col gap-2 p-2">
                                        {salary.status !== "Paid" ? (
                                            <Button
                                                className="bg-blue-700 text-white hover:bg-blue-900 w-full"
                                                disabled={updatingId === salary._id}
                                                onClick={() => handleSalaryStatus(salary._id, "Paid")}
                                            >
                                                Mark Paid
                                            </Button>
                                        ) : (
                                            <span className="text-sm font-semibold text-blue-700">Paid</span>
                                        )}
                                        {salary.status === "Pending" && (
                                            <Button
                                                className="bg-slate-600 text-white hover:bg-slate-800 w-full"
                                                disabled={updatingId === salary._id}
                                                onClick={() => handleSalaryStatus(salary._id, "Delayed")}
                                            >
                                                Delay
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

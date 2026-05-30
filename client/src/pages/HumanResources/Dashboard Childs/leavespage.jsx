import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRLeaves, HandlePatchHRLeaves } from "../../../redux/Thunks/HRLeavesThunk.js"
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

export const HRLeavesPage = () => {
    const dispatch = useDispatch()
    const HRLeavesState = useSelector((state) => state.HRLeavesPageReducer)
    const [updatingId, setUpdatingId] = useState(null)
    const { toast } = useToast()

    useEffect(() => {
        dispatch(HandleGetHRLeaves({ apiroute: "GETALL" }))
    }, [dispatch])

    const handleLeaveStatus = async (leaveID, status) => {
        setUpdatingId(leaveID)
        try {
            await dispatch(HandlePatchHRLeaves({ apiroute: "UPDATE_STATUS", data: { leaveID, status } })).unwrap()
            toast({ title: "Leave updated", description: `Leave request ${status.toLowerCase()} successfully.`, })
            await dispatch(HandleGetHRLeaves({ apiroute: "GETALL" }))
        } catch (error) {
            toast({ variant: "destructive", title: "Unable to update", description: error?.message || "Please try again." })
        } finally {
            setUpdatingId(null)
        }
    }

    if (HRLeavesState.isLoading) {
        return <Loading />
    }

    const leaves = HRLeavesState.data?.data ?? []

    return (
        <div className="leaves-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%] bg-blue-50 rounded-3xl p-5 shadow-xl border border-blue-200">
            <div className="page-heading flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-blue-900">Leaves</h1>
                <p className="text-sm text-blue-700">Review all leave requests and history for your organization.</p>
            </div>
            <div className="overflow-auto rounded-3xl border border-blue-200 bg-white p-4 shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Request</TableHead>
                            <TableHead>Employee</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Approved By</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaves.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-6 text-sm text-muted-foreground">
                                    No leave requests found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            leaves.map((leave) => (
                                <TableRow key={leave._id}>
                                    <TableCell>{leave.title}</TableCell>
                                    <TableCell>{leave.employee ? `${leave.employee.firstname} ${leave.employee.lastname}` : "Unknown"}</TableCell>
                                    <TableCell>{leave.employee?.department ?? "Unknown"}</TableCell>
                                    <TableCell>{new Date(leave.startdate).toLocaleDateString()} - {new Date(leave.enddate).toLocaleDateString()}</TableCell>
                                    <TableCell>{leave.status ?? "Pending"}</TableCell>
                                    <TableCell>{leave.approvedby ? `${leave.approvedby.firstname} ${leave.approvedby.lastname}` : "Not approved"}</TableCell>
                                    <TableCell className="flex flex-col gap-2 p-2">
                                        {leave.status !== "Approved" && leave.status !== "Rejected" ? (
                                            <>
                                                <Button
                                                    className="bg-blue-700 text-white hover:bg-blue-900 w-full"
                                                    disabled={updatingId === leave._id}
                                                    onClick={() => handleLeaveStatus(leave._id, "Approved")}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    className="bg-red-700 text-white hover:bg-red-900 w-full"
                                                    disabled={updatingId === leave._id}
                                                    onClick={() => handleLeaveStatus(leave._id, "Rejected")}
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        ) : (
                                            <span className="text-sm font-semibold text-blue-700">No actions available</span>
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

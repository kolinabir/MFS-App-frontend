import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext, AuthContextProps } from "@/Provider/AuthProvider";

export function ViewTransactions() {
  const { mobileNumber } = useParams();
  const { user } = useContext(AuthContext) as AuthContextProps;

  const fetchTransactions = async () => {
    try {
      if (user?.role === "ADMIN") {
        const response = await axios.get(
          `https://mfs-app-backend.vercel.app/admin-control-panel/transaction/${mobileNumber}`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        return response.data.data;
      } else {
        const response = await axios.get(
          `https://mfs-app-backend.vercel.app/transaction`,
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        return response.data;
      }
    } catch (err) {
      throw new Error(`Error fetching transactions: ${err.message}`);
    }
  };

  const {
    data: transactions,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["transactions", mobileNumber],
    queryFn: fetchTransactions,
    select: (data) => data.data,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Table className="mt-20">
      <TableCaption>A list of your recent transactions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Transaction Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Transaction Date</TableHead>
          <TableHead>Correspondent</TableHead>
          <TableHead>Correspondent Mobile Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions?.map((transaction) => (
          <TableRow key={transaction._id}>
            <TableCell className="font-medium">
              {transaction.transactionType}
            </TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>
              {new Date(transaction.transactionDate).toLocaleString()}
            </TableCell>
            <TableCell>
              {transaction.transactionType === "SEND" && (
                <>
                  <strong>User:</strong> {transaction.receiver.name}
                </>
              )}
              {transaction.transactionType === "CASH_OUT" && (
                <>
                  <strong>Agent:</strong> {transaction?.agent.name}
                </>
              )}
              {transaction.transactionType === "CASH_IN" && (
                <>
                  <strong>{user?.role === "AGENT" ? " User" : " Agent"}</strong>{" "}
                  {user?.role === "AGENT"
                    ? transaction?.user.name
                    : transaction.agent.name}
                </>
              )}
            </TableCell>
            <TableCell>
              {transaction.transactionType === "SEND" && (
                <>
                  <strong>User:</strong> {transaction.receiver.mobileNumber}
                </>
              )}

              {transaction.transactionType === "CASH_OUT" && (
                <>
                  <strong>Agent:</strong> {transaction?.agent.mobileNumber}
                </>
              )}
              {transaction.transactionType === "CASH_IN" && (
                <>
                  <strong>{user?.role === "AGENT" ? " User" : "Agent"}</strong>{" "}
                  {user?.role === "AGENT"
                    ? transaction?.user.mobileNumber
                    : transaction.agent.mobileNumber}
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">
            {transactions.reduce(
              (total, transaction) => total + transaction.amount,
              0
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

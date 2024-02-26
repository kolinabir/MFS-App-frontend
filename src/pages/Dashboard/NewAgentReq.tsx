import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Agent {
  _id: string;
  name: string;
  mobileNumber: string;
  email: string;
  role: string;
  nid: string;
  balance: number;
  isAccountActive: boolean;
  isAccountVerified: boolean;
  devicesLogins: number;
}

const NewAgentReq = () => {
  const [agents, setAgents] = useState([]);
  const token = localStorage.getItem("token");
  const { toast } = useToast();

  console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(
          "https://mfs-app-backend.vercel.app/admin-control-panel/new-agents",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: String(token),
            },
          }
        );

        const data = await response.json();
        console.log(data);

        // Update state with the fetched data
        if (data.success) {
          setAgents(data.data.result);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleVerify = (agentId: string) => {
    // Implement verification logic here
    // https://mfs-app-backend.vercel.app/auth/:id PATCH

    try {
      const response = fetch(
        `https://mfs-app-backend.vercel.app/auth/${agentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: String(token),
          },
        }
      );
      response.then((res) => {
        toast({
          title: "Agent Verified!",
        });
      });
    } catch (error) {
      toast({
        title: "You are not authorized to perform this action!",
      });
    }
  };

  return (
    <Table className="p-4  mt-14">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Mobile Number</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>NID</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Active</TableHead>
          <TableHead>Verified</TableHead>
          <TableHead>Logins</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {agents.map((agent: Agent) => (
          <TableRow key={agent._id}>
            <TableCell>{agent.name}</TableCell>
            <TableCell>{agent.mobileNumber}</TableCell>
            <TableCell>{agent.email}</TableCell>
            <TableCell>{agent.role}</TableCell>
            <TableCell>{agent.nid}</TableCell>
            <TableCell>{agent.balance}</TableCell>
            <TableCell>{agent.isAccountActive ? "Yes" : "No"}</TableCell>
            <TableCell>{agent.isAccountVerified ? "Yes" : "No"}</TableCell>
            <TableCell>{agent.devicesLogins}</TableCell>
            <TableCell>
              <Button className="" onClick={() => handleVerify(agent._id)}>
                Verify
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default NewAgentReq;

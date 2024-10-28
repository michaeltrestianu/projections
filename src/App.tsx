import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import ProjectionTable from "./ProjectionTable";

interface VybesReward {
  minESG: number;
  maxESG: number;
  vybes: number;
}

const App: React.FC = () => {
  const [costPercentage, setCostPercentage] = useState<number>(1.35);
  const [totalCommissionPercentage, setTotalCommissionPercentage] =
    useState<number>(8);
  const [
    commissionPassedToCustomerPercentage,
    setCommissionPassedToCustomerPercentage,
  ] = useState<number>(70);
  const [averageTransactionValue, setAverageTransactionValue] =
    useState<number>(27);
  const [averageESGRating, setAverageESGRating] = useState<number>(75);
  const [numberOfUsersPerMonth, setNumberOfUsersPerMonth] = useState<number[]>([
    100, 200, 250, 350, 500, 600, 1000, 1300, 1450, 1750, 1500, 2000, 3000,
    3800, 5000, 7000, 10000, 10250, 13000, 18000, 25000, 32000, 40000, 50000,
  ]);
  const [
    averageTransactionsPerUserPerMonth,
    setAverageTransactionsPerUserPerMonth,
  ] = useState<number>(10);
  const [hostingCostPerMonth, setHostingCostPerMonth] = useState<number>(4000);
  const [apiServiceCostPerMonth, setApiServiceCostPerMonth] =
    useState<number>(1000);
  const [initialInvestment, setInitialInvestment] = useState<number>(150000);

  const [vybesRewards, setVybesRewards] = useState<VybesReward[]>([
    { minESG: 90, maxESG: 100, vybes: 12 },
    { minESG: 75, maxESG: 89, vybes: 10 },
    { minESG: 50, maxESG: 74, vybes: 8 },
    { minESG: 0, maxESG: 49, vybes: 6 },
  ]);

  const handleNumberOfUsersChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const users = e.target.value
      .split(",")
      .map((v) => parseInt(v.trim(), 10))
      .filter((v) => !isNaN(v));
    setNumberOfUsersPerMonth(users);
  };

  const handleVybesRewardChange = (
    index: number,
    field: keyof VybesReward,
    value: number
  ) => {
    const newVybesRewards = [...vybesRewards];
    newVybesRewards[index][field] = value;
    setVybesRewards(newVybesRewards);
  };

  const addVybesReward = () => {
    setVybesRewards([...vybesRewards, { minESG: 0, maxESG: 0, vybes: 0 }]);
  };

  const removeVybesReward = (index: number) => {
    const newVybesRewards = [...vybesRewards];
    newVybesRewards.splice(index, 1);
    setVybesRewards(newVybesRewards);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Financial Forecasting App
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
        }}
      >
        {/* Existing input fields */}
        <TextField
          label="Cost Percentage (%)"
          type="number"
          value={costPercentage}
          onChange={(e) => setCostPercentage(parseFloat(e.target.value))}
        />
        <TextField
          label="Total Commission Percentage (%)"
          type="number"
          value={totalCommissionPercentage}
          onChange={(e) =>
            setTotalCommissionPercentage(parseFloat(e.target.value))
          }
        />
        <TextField
          label="Commission Passed to Customer (% of Total Commission)"
          type="number"
          value={commissionPassedToCustomerPercentage}
          onChange={(e) =>
            setCommissionPassedToCustomerPercentage(parseFloat(e.target.value))
          }
          inputProps={{ min: 0, max: 100 }}
        />
        <TextField
          label="Average Transaction Value (£)"
          type="number"
          value={averageTransactionValue}
          onChange={(e) =>
            setAverageTransactionValue(parseFloat(e.target.value))
          }
        />
        <TextField
          label="Average ESG Rating (0 - 100)"
          type="number"
          value={averageESGRating}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (value >= 0 && value <= 100) {
              setAverageESGRating(value);
            }
          }}
          inputProps={{ min: 0, max: 100 }}
        />

        {/* Vybes Rewards Configuration */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Configure ESG Rewards:</Typography>
          {vybesRewards.map((reward, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mt: 1,
              }}
            >
              <TextField
                label="Min ESG"
                type="number"
                value={reward.minESG}
                onChange={(e) =>
                  handleVybesRewardChange(
                    index,
                    "minESG",
                    parseFloat(e.target.value)
                  )
                }
                inputProps={{ min: 0, max: 100 }}
              />
              <TextField
                label="Max ESG"
                type="number"
                value={reward.maxESG}
                onChange={(e) =>
                  handleVybesRewardChange(
                    index,
                    "maxESG",
                    parseFloat(e.target.value)
                  )
                }
                inputProps={{ min: 0, max: 100 }}
              />
              <TextField
                label="Vybes"
                type="number"
                value={reward.vybes}
                onChange={(e) =>
                  handleVybesRewardChange(
                    index,
                    "vybes",
                    parseFloat(e.target.value)
                  )
                }
                inputProps={{ min: 0 }}
              />
              <IconButton onClick={() => removeVybesReward(index)}>
                <RemoveCircle color="error" />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircle />}
            onClick={addVybesReward}
            sx={{ mt: 1 }}
          >
            Add Reward Rule
          </Button>
        </Box>

        {/* Remaining input fields */}
        <TextField
          label="Number of Users per Month (comma-separated)"
          fullWidth
          onChange={handleNumberOfUsersChange}
          defaultValue={numberOfUsersPerMonth}
        />
        <TextField
          label="Average Transactions per User per Month"
          type="number"
          value={averageTransactionsPerUserPerMonth}
          onChange={(e) =>
            setAverageTransactionsPerUserPerMonth(parseFloat(e.target.value))
          }
        />
        <TextField
          label="Hosting Cost per Month (£)"
          type="number"
          value={hostingCostPerMonth}
          onChange={(e) => setHostingCostPerMonth(parseFloat(e.target.value))}
        />
        <TextField
          label="API Service Cost per Month (£)"
          type="number"
          value={apiServiceCostPerMonth}
          onChange={(e) =>
            setApiServiceCostPerMonth(parseFloat(e.target.value))
          }
        />
        <TextField
          label="Initial Investment (£)"
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
        />
      </Box>
      <ProjectionTable
        costPercentage={costPercentage}
        totalCommissionPercentage={totalCommissionPercentage}
        commissionPassedToCustomerPercentage={
          commissionPassedToCustomerPercentage
        }
        averageTransactionValue={averageTransactionValue}
        averageESGRating={averageESGRating}
        vybesRewards={vybesRewards}
        numberOfUsersPerMonth={numberOfUsersPerMonth}
        averageTransactionsPerUserPerMonth={averageTransactionsPerUserPerMonth}
        hostingCostPerMonth={hostingCostPerMonth}
        apiServiceCostPerMonth={apiServiceCostPerMonth}
        initialInvestment={initialInvestment}
      />
    </Container>
  );
};

export default App;

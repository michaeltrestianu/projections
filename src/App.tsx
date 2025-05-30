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
  minTransactionValue: number;
  maxTransactionValue: number;
  vybes: number;
}

const App: React.FC = () => {
  const [costPercentage, setCostPercentage] = useState<number>(0.75);
  const [feePerTransaction, setFeePerTransaction] = useState<number>(0.1);
  const [totalCommissionPercentage, setTotalCommissionPercentage] =
    useState<number>(8);
  const [
    commissionPassedToCustomerPercentage,
    setCommissionPassedToCustomerPercentage,
  ] = useState<number>(70);
  const [averageTransactionValue, setAverageTransactionValue] =
    useState<number>(27);
  const [vybesAwardedPerTransaction, setVybesAwardedPerTransaction] = useState<number>(30);
  const [vybesValueInPounds, setVybesValueInPounds] = useState<number>(0.001);
  const [numberOfUsersPerMonth, setNumberOfUsersPerMonth] = useState<number[]>([
    100,300, 800, 1500, 3000, 6000, 10500, 14000, 19000, 26000, 30000, 35000, 45000, 55000,65000,75000,85000,95000, 105000, 115000, 125000, 135000,145000,155000
  ]);
  const [
    averageTransactionsPerUserPerMonth,
    setAverageTransactionsPerUserPerMonth,
  ] = useState<number>(10);
  const [hostingCostPerMonth, setHostingCostPerMonth] = useState<number>(2900);
  const [apiServiceCostPerMonth, setApiServiceCostPerMonth] =
    useState<number>(3000);
    const [marketingCostPerMonth, setMarketingCostPerMonth] =
    useState<number>(2000);
  const [initialInvestment, setInitialInvestment] = useState<number>(200000);

  const [referralRewardPerNewCustomer, setReferralRewardPerNewCustomer] =
    useState<number>(3);

  const [vybeReferralRewardPerNewCustomer, setVybeReferralRewardPerNewCustomer] =
    useState<number>(50);

    const [textMessageCostPerNewCustomer, setTextMessageCostPerNewCustomer] =
    useState<number>(0.04);

  const [vybesRewards, setVybesRewards] = useState<VybesReward[]>([
    { minTransactionValue: 20, maxTransactionValue: 30, vybes: 30 },
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
    setVybesRewards([...vybesRewards, { minTransactionValue: 0, maxTransactionValue: 0, vybes: 0 }]);
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
        <TextField
          label="Transaction percentage fee (%)"
          helperText="Tillo issuance fee"
          type="number"
          value={costPercentage}
          onChange={(e) => setCostPercentage(parseFloat(e.target.value))}
        />
        <TextField
          label="Fee per transaction (£)"
          helperText="How much Token.io charge per transaction"
          type="number"
          value={feePerTransaction}
          onChange={(e) => setFeePerTransaction(parseFloat(e.target.value))}
        />
        <TextField
          label="Average Tillo commission available to us from brands (%)"
          type="number"
          value={totalCommissionPercentage}
          onChange={(e) =>
            setTotalCommissionPercentage(parseFloat(e.target.value))
          }
        />
        <TextField
          label="Tillo commission passed to customer (% of total commission)"
          type="number"
          value={commissionPassedToCustomerPercentage}
          onChange={(e) =>
            setCommissionPassedToCustomerPercentage(parseFloat(e.target.value))
          }
          inputProps={{ min: 0, max: 100 }}
        />
        <TextField
          label="Average gift card transaction value (£)"
          type="number"
          value={averageTransactionValue}
          onChange={(e) =>
            setAverageTransactionValue(parseFloat(e.target.value))
          }
        />
        <TextField
          label="Vybes awarded per transaction"
          type="number"
          value={vybesAwardedPerTransaction}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (value >= 0 && value <= 100) {
              setVybesAwardedPerTransaction(value);
            }
          }}
          inputProps={{ min: 0, max: 100 }}
        />

        <TextField
          label="Vybes value in (£)"
          type="number"
          value={vybesValueInPounds}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
              setVybesValueInPounds(value);
          }}
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Configure Additional Transaction rewards:</Typography>
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
                label="Min Transaction value in £"
                type="number"
                value={reward.minTransactionValue}
                onChange={(e) =>
                  handleVybesRewardChange(
                    index,
                    "minTransactionValue",
                    parseFloat(e.target.value)
                  )
                }
                inputProps={{ min: 0 }}
              />
              <TextField
                label="Max Transaction value in £"
                type="number"
                value={reward.maxTransactionValue}
                onChange={(e) =>
                  handleVybesRewardChange(
                    index,
                    "maxTransactionValue",
                    parseFloat(e.target.value)
                  )
                }
                inputProps={{ min: 0 }}
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

        <TextField
          label="Referral reward per new customer (£)"
          type="number"
          value={referralRewardPerNewCustomer}
          onChange={e => setReferralRewardPerNewCustomer(parseFloat(e.target.value))}
          helperText="Paid once after first purchase"
        />

        <TextField
          label="Referral reward per new customer (vybes)"
          type="number"
          value={vybeReferralRewardPerNewCustomer}
          onChange={e => setVybeReferralRewardPerNewCustomer(parseFloat(e.target.value))}
          helperText="Paid once after first purchase"
        />

        <TextField
          label="Text message cost per new customer (£)"
          type="number"
          value={textMessageCostPerNewCustomer}
          onChange={e => setTextMessageCostPerNewCustomer(parseFloat(e.target.value))}
          helperText="Paid to verify mobile number"
        />

        <TextField
          label="Number of users per month (comma-separated)"
          fullWidth
          onChange={handleNumberOfUsersChange}
          defaultValue={numberOfUsersPerMonth}
        />
        <TextField
          label="Average number of gift card purchases per user per month"
          type="number"
          value={averageTransactionsPerUserPerMonth}
          onChange={(e) =>
            setAverageTransactionsPerUserPerMonth(parseFloat(e.target.value))
          }
        />
        <TextField
          label="Decode costs per month (£)"
          type="number"
          value={hostingCostPerMonth}
          onChange={(e) => setHostingCostPerMonth(parseFloat(e.target.value))}
          helperText="SNA & hosting costs"
        />
        <TextField
          label="Tillo/Token.io API service cost per month (£)"
          type="number"
          value={apiServiceCostPerMonth}
          onChange={(e) =>
            setApiServiceCostPerMonth(parseFloat(e.target.value))
          }
        />
        <TextField
          label="Marketing cost per month (£)"
          type="number"
          value={marketingCostPerMonth}
          onChange={(e) =>
            setMarketingCostPerMonth(parseFloat(e.target.value))
          }
        />
        <TextField
          label="Initial investment (£)"
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
        />
      </Box>
      <ProjectionTable
        costPercentage={costPercentage}
        feePerTransaction={feePerTransaction}
        totalCommissionPercentage={totalCommissionPercentage}
        commissionPassedToCustomerPercentage={
          commissionPassedToCustomerPercentage
        }
        averageTransactionValue={averageTransactionValue}
        vybesAwardedPerTransaction={vybesAwardedPerTransaction}
        vybesValueInPounds={vybesValueInPounds}
        vybesRewards={vybesRewards}
        numberOfUsersPerMonth={numberOfUsersPerMonth}
        averageTransactionsPerUserPerMonth={averageTransactionsPerUserPerMonth}
        hostingCostPerMonth={hostingCostPerMonth}
        apiServiceCostPerMonth={apiServiceCostPerMonth}
        marketingCostPerMonth={marketingCostPerMonth}
        initialInvestment={initialInvestment}
        referralRewardPerNewCustomer={referralRewardPerNewCustomer}
        vybeReferralRewardPerNewCustomer={vybeReferralRewardPerNewCustomer}
        textMessageCostPerNewCustomer={textMessageCostPerNewCustomer}
      />
    </Container>
  );
};

export default App;

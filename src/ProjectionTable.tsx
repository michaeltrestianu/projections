import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface VybesReward {
  minESG: number;
  maxESG: number;
  vybes: number;
}

interface ProjectionTableProps {
  costPercentage: number;
  feePerTransaction: number;
  totalCommissionPercentage: number;
  commissionPassedToCustomerPercentage: number;
  averageTransactionValue: number;
  averageESGRating: number;
  vybesRewards: VybesReward[];
  numberOfUsersPerMonth: number[];
  averageTransactionsPerUserPerMonth: number;
  hostingCostPerMonth: number;
  apiServiceCostPerMonth: number;
  initialInvestment: number;
}

interface Projection {
  month: number;
  numberOfUsers: number;
  transactionVolume: number;
  totalTransactionAmount: number;
  totalTransactionCostAmount: number;
  totalCommission: number;
  commissionPassedToCustomer: number;
  commissionKeptAsProfit: number;
  vybesAwardedPerTransaction: number;
  totalVybesAwarded: number;
  totalVybesValue: number;
  revenue: number;
  netRevenue: number;
  totalFixedCosts: number;
  netProfit: number;
  cumulativeNetProfit: number;
}

const ProjectionTable: React.FC<ProjectionTableProps> = ({
  costPercentage,
  feePerTransaction,
  totalCommissionPercentage,
  commissionPassedToCustomerPercentage,
  averageTransactionValue,
  averageESGRating,
  vybesRewards,
  numberOfUsersPerMonth,
  averageTransactionsPerUserPerMonth,
  hostingCostPerMonth,
  apiServiceCostPerMonth,
  initialInvestment,
}) => {
  const vybesRule = vybesRewards.find(
    (rule) => averageESGRating >= rule.minESG && averageESGRating <= rule.maxESG
  );

  const vybesAwardedPerTransaction = vybesRule ? vybesRule.vybes : 0;

  if (
    costPercentage < 0 ||
    feePerTransaction < 0 ||
    totalCommissionPercentage <= 0 ||
    commissionPassedToCustomerPercentage < 0 ||
    commissionPassedToCustomerPercentage > 100 ||
    averageTransactionValue <= 0 ||
    averageESGRating < 0 ||
    averageESGRating > 100 ||
    averageTransactionsPerUserPerMonth <= 0 ||
    numberOfUsersPerMonth.length === 0 ||
    hostingCostPerMonth < 0 ||
    apiServiceCostPerMonth < 0 ||
    vybesRewards.length === 0 ||
    initialInvestment < 0
  ) {
    return (
      <Typography variant="body1" align="center">
        Please enter valid values for all inputs to see projections.
      </Typography>
    );
  }

  const projections: Projection[] = [];

  let cumulativeNumberOfUsers = 0;
  let cumulativeTransactionVolume = 0;
  let cumulativeTotalTransactionAmount = 0;
  let cumulativeTotalTransactionCostAmount = 0;
  let cumulativeTotalCommission = 0;
  let cumulativeCommissionPassedToCustomer = 0;
  let cumulativeCommissionKeptAsProfit = 0;
  let cumulativeTotalVybesAwarded = 0;
  let cumulativeTotalVybesValue = 0;
  let cumulativeRevenue = 0;
  let cumulativeNetRevenue = 0;
  let cumulativeTotalFixedCosts = 0;
  let cumulativeNetProfit = -initialInvestment;

  for (let month = 1; month <= numberOfUsersPerMonth.length; month++) {
    const numberOfUsers = numberOfUsersPerMonth[month - 1];
    const transactionVolume =
      numberOfUsers * averageTransactionsPerUserPerMonth;

    const totalTransactionAmount = averageTransactionValue * transactionVolume;

    const totalCommission =
      (totalCommissionPercentage / 100) * totalTransactionAmount;

    const commissionPassedToCustomer =
      (commissionPassedToCustomerPercentage / 100) * totalCommission;

    const commissionKeptAsProfit = totalCommission - commissionPassedToCustomer;

    const totalVybesAwarded = vybesAwardedPerTransaction * transactionVolume;

    const totalVybesValue = totalVybesAwarded / 100;

    const revenue = commissionKeptAsProfit;

    const totalTransactionCostAmount =
      ((costPercentage / 100) * totalTransactionAmount) + (feePerTransaction * transactionVolume);

    const netRevenue = revenue - totalTransactionCostAmount - totalVybesValue;

    const totalFixedCosts = hostingCostPerMonth + apiServiceCostPerMonth;

    const netProfit = netRevenue - totalFixedCosts;

    cumulativeNumberOfUsers += numberOfUsers;
    cumulativeTransactionVolume += transactionVolume;
    cumulativeTotalTransactionAmount += totalTransactionAmount;
    cumulativeTotalTransactionCostAmount += totalTransactionCostAmount;
    cumulativeTotalCommission += totalCommission;
    cumulativeCommissionPassedToCustomer += commissionPassedToCustomer;
    cumulativeCommissionKeptAsProfit += commissionKeptAsProfit;
    cumulativeTotalVybesAwarded += totalVybesAwarded;
    cumulativeTotalVybesValue += totalVybesValue;
    cumulativeRevenue += revenue;
    cumulativeNetRevenue += netRevenue;
    cumulativeTotalFixedCosts += totalFixedCosts;
    cumulativeNetProfit += netProfit;

    projections.push({
      month,
      numberOfUsers,
      transactionVolume,
      totalTransactionAmount,
      totalTransactionCostAmount,
      totalCommission,
      commissionPassedToCustomer,
      commissionKeptAsProfit,
      vybesAwardedPerTransaction,
      totalVybesAwarded,
      totalVybesValue,
      revenue,
      netRevenue,
      totalFixedCosts,
      netProfit,
      cumulativeNetProfit: cumulativeNetProfit,
    });
  }

  const formatCurrency = (value: number) => {
    const absoluteValue = Math.abs(value);
    const formattedValue = absoluteValue.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
    return value < 0 ? `-${formattedValue}` : formattedValue;
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        Monthly Projections for the Year
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Month</TableCell>
              <TableCell align="center">Number of Users</TableCell>
              <TableCell align="center">Transaction Volume</TableCell>
              <TableCell align="center">Total Transaction Amount (£)</TableCell>
              <TableCell align="center">
                Total Transaction Amount Cost (£)
              </TableCell>
              <TableCell align="center">Total Commission (£)</TableCell>
              <TableCell align="center">
                Commission Passed to Customer (£)
              </TableCell>
              <TableCell align="center">
                Commission Kept as Profit (£)
              </TableCell>
              <TableCell align="center">
                Vybes Awarded per Transaction
              </TableCell>
              <TableCell align="center">Total Vybes Awarded</TableCell>
              <TableCell align="center">Total Vybes Value (£)</TableCell>
              <TableCell align="center">Revenue (£)</TableCell>
              <TableCell align="center">Net Revenue (£)</TableCell>
              <TableCell align="center">Total Fixed Costs (£)</TableCell>
              <TableCell align="center">Net Profit (£)</TableCell>
              <TableCell align="center">Cumulative Net Profit (£)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projections.map((proj, index) => (
              <TableRow
                key={index}
                sx={{
                  "& td": {
                    color: proj.cumulativeNetProfit < 0 ? "red" : "green",
                    whiteSpace: "nowrap",
                  },
                }}
              >
                <TableCell align="center">{proj.month}</TableCell>
                <TableCell align="center">{proj.numberOfUsers}</TableCell>
                <TableCell align="center">{proj.transactionVolume}</TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.totalTransactionAmount)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.totalTransactionCostAmount)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.totalCommission)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.commissionPassedToCustomer)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.commissionKeptAsProfit)}
                </TableCell>
                <TableCell align="center">
                  {proj.vybesAwardedPerTransaction}
                </TableCell>
                <TableCell align="center">{proj.totalVybesAwarded}</TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.totalVybesValue)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.revenue)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.netRevenue)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.totalFixedCosts)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.netProfit)}
                </TableCell>
                <TableCell align="center">
                  {formatCurrency(proj.cumulativeNetProfit)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{
                "& td": {
                  color: cumulativeNetProfit < 0 ? "red" : "green",
                },
              }}
            >
              <TableCell align="center" colSpan={1}>
                <strong>Cumulative Totals</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{cumulativeNumberOfUsers}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{cumulativeTransactionVolume}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>
                  {formatCurrency(cumulativeTotalTransactionAmount)}
                </strong>
              </TableCell>
              <TableCell align="center">
                <strong>
                  {formatCurrency(cumulativeTotalTransactionCostAmount)}
                </strong>
              </TableCell>
              <TableCell align="center">
                <strong>{formatCurrency(cumulativeTotalCommission)}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>
                  {formatCurrency(cumulativeCommissionPassedToCustomer)}
                </strong>
              </TableCell>
              <TableCell align="center">
                <strong>
                  {formatCurrency(cumulativeCommissionKeptAsProfit)}
                </strong>
              </TableCell>
              <TableCell align="center">
                <strong>-</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{cumulativeTotalVybesAwarded}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{formatCurrency(cumulativeTotalVybesValue)}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{formatCurrency(cumulativeRevenue)}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{formatCurrency(cumulativeNetRevenue)}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{formatCurrency(cumulativeTotalFixedCosts)}</strong>
              </TableCell>
              <TableCell align="center">
                <strong>
                  {formatCurrency(cumulativeNetProfit + initialInvestment)}
                </strong>
              </TableCell>
              <TableCell align="center">
                <strong>{formatCurrency(cumulativeNetProfit)}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProjectionTable;

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
  Button,
} from "@mui/material";

interface ProjectionTableProps {
  costPercentage: number;
  feePerTransaction: number;
  totalCommissionPercentage: number;
  commissionPassedToCustomerPercentage: number;
  averageTransactionValue: number;
  vybesAwardedPerTransaction: number;
  vybesValueInPounds: number;
  numberOfUsersPerMonth: number[];
  averageTransactionsPerUserPerMonth: number;
  hostingCostPerMonth: number;
  apiServiceCostPerMonth: number;
  marketingCostPerMonth: number;
  initialInvestment: number;
  referralRewardPerNewCustomer: number;
  vybeReferralRewardPerNewCustomer: number;
  textMessageCostPerNewCustomer: number;
}

interface Projection {
  month: number;
  numberOfUsers: number;
  newCustomerReferralCost: number;
  newCustomerVybeReferralCost: number;
  newCustomerTextVerificationCost: number;
  transactionVolume: number;
  totalTransactionAmount: number;
  totalTransactionCostAmount: number;
  totalCommission: number;
  commissionPassedToCustomer: number;
  commissionKeptAsProfit: number;
  totalVybesAwardedPerTransaction: number;
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
  vybesAwardedPerTransaction,
  vybesValueInPounds,
  numberOfUsersPerMonth,
  averageTransactionsPerUserPerMonth,
  hostingCostPerMonth,
  apiServiceCostPerMonth,
  marketingCostPerMonth,
  initialInvestment,
  referralRewardPerNewCustomer,
  vybeReferralRewardPerNewCustomer,
  textMessageCostPerNewCustomer,
}) => {

  const totalVybesAwardedPerTransaction = vybesAwardedPerTransaction;
  const newCustomersPerMonth = numberOfUsersPerMonth.map((u, i) =>
    i === 0 ? u : Math.max(u - numberOfUsersPerMonth[i - 1], 0)
  );

  if (
    costPercentage < 0 ||
    feePerTransaction < 0 ||
    totalCommissionPercentage <= 0 ||
    commissionPassedToCustomerPercentage < 0 ||
    commissionPassedToCustomerPercentage > 100 ||
    averageTransactionValue <= 0 ||
    vybesAwardedPerTransaction < 0 ||
    vybesValueInPounds < 0 ||
    averageTransactionsPerUserPerMonth <= 0 ||
    numberOfUsersPerMonth.length === 0 ||
    hostingCostPerMonth < 0 ||
    apiServiceCostPerMonth < 0 ||
    marketingCostPerMonth < 0 ||
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
  let cumulativeNewCustomerReferralCost = 0;
  let cumulativeNewCustomerReferralVybeCost = 0;
  let cumulativeNewCustomerTextVerificationCost = 0;

  for (let month = 1; month <= numberOfUsersPerMonth.length; month++) {
    const numberOfUsers = numberOfUsersPerMonth[month - 1];
    const newCust = newCustomersPerMonth[month-1];
    const newCustomerReferralCost = newCust * referralRewardPerNewCustomer;
    const newCustomerVybeReferralCost = newCust * (vybeReferralRewardPerNewCustomer * vybesValueInPounds);
    const newCustomerTextVerificationCost = newCust * textMessageCostPerNewCustomer;

    const transactionVolume =
      numberOfUsers * averageTransactionsPerUserPerMonth;

    const totalTransactionAmount = averageTransactionValue * transactionVolume;

    const totalCommission =
      (totalCommissionPercentage / 100) * totalTransactionAmount;

    const commissionPassedToCustomer =
      (commissionPassedToCustomerPercentage / 100) * totalCommission;

    const commissionKeptAsProfit = totalCommission - commissionPassedToCustomer;

    const totalVybesAwarded = totalVybesAwardedPerTransaction * transactionVolume;

    const totalVybesValue = totalVybesAwarded * vybesValueInPounds;

    const revenue = commissionKeptAsProfit;

    const totalTransactionCostAmount =
      ((costPercentage / 100) * totalTransactionAmount) + (feePerTransaction * transactionVolume);

    const netRevenue = revenue - totalTransactionCostAmount - totalVybesValue - newCustomerReferralCost - newCustomerVybeReferralCost - newCustomerTextVerificationCost;

    const totalFixedCosts = hostingCostPerMonth + apiServiceCostPerMonth + marketingCostPerMonth;

    const netProfit = netRevenue - totalFixedCosts;

    cumulativeNumberOfUsers += numberOfUsers;
    cumulativeNewCustomerReferralCost += newCustomerReferralCost;
    cumulativeNewCustomerReferralVybeCost += newCustomerVybeReferralCost;
    cumulativeNewCustomerTextVerificationCost += newCustomerTextVerificationCost;
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
      newCustomerReferralCost,
      newCustomerVybeReferralCost,
      newCustomerTextVerificationCost,
      transactionVolume,
      totalTransactionAmount,
      totalTransactionCostAmount,
      totalCommission,
      commissionPassedToCustomer,
      commissionKeptAsProfit,
      totalVybesAwardedPerTransaction,
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

  const handleExportCSV = (): void => {
    const rows = projections.map((p) => ({
      Month: p.month,
      Users: p.numberOfUsers,
      "Referral Cost (£)": `"${formatCurrency(p.newCustomerReferralCost)}"`,
      "Vybe Referral Cost (£)": `"${formatCurrency(p.newCustomerVybeReferralCost)}"`,
      "Text Verification Cost (£)": `"${formatCurrency(p.newCustomerTextVerificationCost)}"`,
      "Transaction Volume": p.transactionVolume,
      "Total Tx Amount (£)": `"${formatCurrency(p.totalTransactionAmount)}"`,
      "Total Tx Cost (£)": `"${formatCurrency(p.totalTransactionCostAmount)}"`,
      "Total Commission (£)": `"${formatCurrency(p.totalCommission)}"`,
      "Commission to Customer (£)": `"${formatCurrency(p.commissionPassedToCustomer)}"`,
      "Commission Profit (£)": `"${formatCurrency(p.commissionKeptAsProfit)}"`,
      "Vybes/Tx": vybesAwardedPerTransaction,
      "Total Vybes": p.totalVybesAwarded,
      "Vybes Value (£)": `"${formatCurrency(p.totalVybesValue)}"`,
      "Revenue (£)": `"${formatCurrency(p.revenue)}"`,
      "Net Revenue (£)": `"${formatCurrency(p.netRevenue)}"`,
      "Fixed Costs (£)": `"${formatCurrency(p.totalFixedCosts)}"`,
      "Net Profit (£)": `"${formatCurrency(p.netProfit)}"`,
      "Cumulative Net Profit (£)": `"${formatCurrency(p.cumulativeNetProfit)}"`,
    }));
    const header = Object.keys(rows[0]).join(",") + "\n";
    const csvBody = rows
      .map((r) => Object.values(r).join(","))
      .join("\n");
    const blob = new Blob([header + csvBody], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monthly_projections.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>
        Monthly Projections for the Year
      </Typography>
      <Button variant="contained" onClick={handleExportCSV} sx={{ mb: 2 }}>
        Export Data
      </Button>
       <Box mb={2}>
        <Typography variant="subtitle1">How to read each column:</Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <Box component="li">
            <strong>Month</strong>: Sequential month number (1, 2, …).
          </Box>
          <Box component="li">
            <strong>Number of Users</strong>: Total active users that month.
          </Box>
          <Box component="li">
            <strong>New Customer Referral Cost (£)</strong>: New users × referral Reward Per New Customer.
          </Box>
          <Box component="li">
            <strong>New Customer Referral Cost (vybe)</strong>: New users × vybe Referral Reward Per NewCustomer × vybes Value In Pounds.
          </Box>
          <Box component="li">
            <strong>New Customer Text Verification Cost (£)</strong>: New users × text Message Cost Per New Customer.
          </Box>
          <Box component="li">
            <strong>Transaction Volume</strong>: Number Of Users × average Transactions Per User Per Month.
          </Box>
          <Box component="li">
            <strong>Total Transaction Amount (£)</strong>: Average transaction value × transaction volume.
          </Box>
          <Box component="li">
            <strong>Total Transaction Amount Cost (£)</strong>: Tillo issuance fee % of the total transaction amount + (fee per transaction × transaction volume).
          </Box>
          <Box component="li">
            <strong>Total Commission (£)</strong>: Average availble Tillo commission (e.g over 200 brands rate is 8%) as a percentage of total transaction amount.
          </Box>
          <Box component="li">
            <strong>Commission Passed to Customer (£)</strong>: Commission passed to customer (e.g 10% discount from Tillo we pass 75%) percentage% of total commission.
          </Box>
          <Box component="li">
            <strong>Commission Kept as Profit (£)</strong>: Total commission − commission passed to customer.
          </Box>
          <Box component="li">
            <strong>Vybes Awarded per Transaction</strong>: Vybes awarded per transaction.
          </Box>
          <Box component="li">
            <strong>Total Vybes Awarded</strong>: Vybes awarded per transaction × transaction volume.
          </Box>
          <Box component="li">
            <strong>Total Vybes Value (£)</strong>: Total vybes awarded × vybes value in pounds.
          </Box>
          <Box component="li">
            <strong>Revenue (£)</strong>: Commission kept as profit.
          </Box>
          <Box component="li">
            <strong>Net Revenue (£)</strong>: Revenue − transaction costs − vybes value − all new customer acquisition costs.
          </Box>
          <Box component="li">
            <strong>Total Fixed Costs (£)</strong>: Hosting & decode cost per month + api services cost per month + marketing cost per month.
          </Box>
          <Box component="li">
            <strong>Net Profit (£)</strong>: Net revenue − total fixed costs.
          </Box>
          <Box component="li">
            <strong>Cumulative Net Profit (£)</strong>: Running total profit minus initial investment.
          </Box>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Month</TableCell>
              <TableCell align="center">Number of Users</TableCell>
              <TableCell align="center">New Customer Referral Cost (£)</TableCell>
              <TableCell align="center">New Customer Referral Cost (vybe)</TableCell>
              <TableCell align="center">New Customer text verification Cost (£)</TableCell>
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
                <TableCell align="center">{formatCurrency(proj.newCustomerReferralCost)}</TableCell>
                <TableCell align="center">{formatCurrency(proj.newCustomerVybeReferralCost)}</TableCell>
                <TableCell align="center">{formatCurrency(proj.newCustomerTextVerificationCost)}</TableCell>
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
                  {proj.totalVybesAwardedPerTransaction}
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
              <TableCell align="center"><strong>{formatCurrency(cumulativeNewCustomerReferralCost)}</strong></TableCell>
              <TableCell align="center"><strong>{formatCurrency(cumulativeNewCustomerReferralVybeCost)}</strong></TableCell>
              <TableCell align="center"><strong>{formatCurrency(cumulativeNewCustomerTextVerificationCost)}</strong></TableCell>
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

import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, Plus, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const budgetOverview = {
  totalBudget: 245000,
  totalSpent: 147000,
  totalAllocated: 195000,
  remaining: 98000,
  savings: 12000
};

const budgetCategories = [
  {
    category: "Venue",
    allocated: 80000,
    spent: 75000,
    remaining: 5000,
    status: "on-track",
    percentage: 93.8
  },
  {
    category: "Catering",
    allocated: 50000,
    spent: 35000,
    remaining: 15000,
    status: "under-budget",
    percentage: 70
  },
  {
    category: "Decoration",
    allocated: 30000,
    spent: 22000,
    remaining: 8000,
    status: "on-track",
    percentage: 73.3
  },
  {
    category: "Photography",
    allocated: 15000,
    spent: 15000,
    remaining: 0,
    status: "fully-used",
    percentage: 100
  },
  {
    category: "Music & Entertainment",
    allocated: 20000,
    spent: 0,
    remaining: 20000,
    status: "not-started",
    percentage: 0
  }
];

const recentExpenses = [
  {
    date: "2024-12-10",
    description: "Venue Advance Payment",
    category: "Venue",
    amount: 25000,
    status: "approved"
  },
  {
    date: "2024-12-09",
    description: "Decoration Materials",
    category: "Decoration",
    amount: 8500,
    status: "pending"
  },
  {
    date: "2024-12-08",
    description: "Photography Booking",
    category: "Photography",
    amount: 15000,
    status: "approved"
  },
  {
    date: "2024-12-07",
    description: "Catering Tasting Session",
    category: "Catering",
    amount: 2000,
    status: "approved"
  }
];

export function BudgetDashboard() {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "default";
      case "under-budget": return "secondary";
      case "fully-used": return "outline";
      case "over-budget": return "destructive";
      case "not-started": return "outline";
      default: return "outline";
    }
  };

  const getExpenseStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "secondary";
      case "pending": return "default";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-accent rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Budget & Finance</h1>
        <p className="text-white/90">Track and manage your event budgets and expenses</p>
      </div>

      {/* Budget Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold">₹{budgetOverview.totalBudget.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gradient-hero rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">₹{budgetOverview.totalSpent.toLocaleString()}</p>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  60% of budget
                </div>
              </div>
              <div className="p-3 bg-gradient-card rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold">₹{budgetOverview.remaining.toLocaleString()}</p>
                <div className="flex items-center text-sm text-blue-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  40% available
                </div>
              </div>
              <div className="p-3 bg-gradient-accent rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Savings</p>
                <p className="text-2xl font-bold text-green-600">₹{budgetOverview.savings.toLocaleString()}</p>
                <div className="flex items-center text-sm text-green-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  Under budget
                </div>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Categories */}
        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Budget by Category</CardTitle>
            <Button size="sm" variant="outline" onClick={() => alert('Add Category functionality - would open a modal to add new budget category')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {budgetCategories.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.category}</span>
                    <Badge variant={getStatusColor(item.status)} className="text-xs">
                      {item.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <span className="text-sm font-medium">
                    ₹{item.spent.toLocaleString()} / ₹{item.allocated.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-1">
                  <Progress value={item.percentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.percentage.toFixed(1)}% used</span>
                    <span>₹{item.remaining.toLocaleString()} remaining</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Expenses</CardTitle>
            <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/customer/analytics')}>
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentExpenses.map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gradient-subtle rounded-lg border border-border/50">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{expense.description}</h4>
                      <Badge variant={getExpenseStatusColor(expense.status)} className="text-xs">
                        {expense.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{expense.category}</span>
                      <span>{new Date(expense.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="font-semibold">₹{expense.amount.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button className="bg-gradient-hero text-white hover:opacity-90" onClick={() => alert('Add Expense functionality - would open expense form')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
        <Button variant="outline" onClick={() => alert('Export functionality - would download budget report')}>
          Export Budget Report
        </Button>
        <Button variant="outline" onClick={() => alert('Budget Alert functionality - would set up notifications')}>
          Set Budget Alert
        </Button>
      </div>
    </div>
  );
}
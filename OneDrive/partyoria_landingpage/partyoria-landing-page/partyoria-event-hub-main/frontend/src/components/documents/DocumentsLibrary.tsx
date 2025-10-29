import { useState } from "react";
import { FileText, Upload, Download, Eye, Trash2, Search, Filter, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const documents = [
  {
    id: 1,
    name: "Venue Contract - Grand Ballroom",
    type: "Contract",
    size: "2.4 MB",
    uploadDate: "2024-12-10",
    category: "Venue",
    status: "Signed",
    uploadedBy: "John Doe"
  },
  {
    id: 2,
    name: "Catering Menu & Proposal",
    type: "Proposal",
    size: "1.8 MB",
    uploadDate: "2024-12-09",
    category: "Catering",
    status: "Under Review",
    uploadedBy: "Spice Garden Catering"
  },
  {
    id: 3,
    name: "Photography Package Details",
    type: "Invoice",
    size: "856 KB",
    uploadDate: "2024-12-08",
    category: "Photography",
    status: "Paid",
    uploadedBy: "Pixel Perfect Photography"
  },
  {
    id: 4,
    name: "Decoration Mockups & Quote",
    type: "Proposal",
    size: "3.2 MB",
    uploadDate: "2024-12-07",
    category: "Decoration",
    status: "Pending",
    uploadedBy: "Dream Decorators"
  },
  {
    id: 5,
    name: "Event Insurance Policy",
    type: "Insurance",
    size: "1.1 MB",
    uploadDate: "2024-12-06",
    category: "Insurance",
    status: "Active",
    uploadedBy: "John Doe"
  },
  {
    id: 6,
    name: "Guest List Template",
    type: "Template",
    size: "245 KB",
    uploadDate: "2024-12-05",
    category: "Planning",
    status: "Active",
    uploadedBy: "John Doe"
  }
];

const documentTypes = ["All", "Contract", "Invoice", "Proposal", "Insurance", "Template"];
const categories = ["All", "Venue", "Catering", "Photography", "Decoration", "Insurance", "Planning"];

export function DocumentsLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || doc.type === selectedType;
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Signed": case "Paid": case "Active": return "secondary";
      case "Under Review": return "default";
      case "Pending": return "outline";
      default: return "outline";
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-subtle rounded-2xl p-8 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Documents Library</h1>
            <p className="text-muted-foreground">Store and manage all your event-related documents</p>
          </div>
          <Button size="lg" className="bg-gradient-hero text-white hover:opacity-90" onClick={() => document.getElementById('file-upload')?.click()}>
            <Upload className="h-5 w-5 mr-2" />
            Upload Document
          </Button>
          <input id="file-upload" type="file" className="hidden" accept=".pdf,.doc,.docx,.jpg,.png" />
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Type: {selectedType}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {documentTypes.map((type) => (
                    <DropdownMenuItem key={type} onClick={() => setSelectedType(type)}>
                      {type}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Category: {selectedCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((category) => (
                    <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{documents.length}</div>
              <div className="text-sm text-muted-foreground">Total Documents</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {documents.filter(d => d.status === "Signed" || d.status === "Paid").length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {documents.filter(d => d.status === "Under Review" || d.status === "Pending").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {(documents.reduce((acc, doc) => acc + parseFloat(doc.size), 0)).toFixed(1)} MB
              </div>
              <div className="text-sm text-muted-foreground">Storage Used</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Table */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Documents ({filteredDocuments.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getFileIcon(doc.type)}
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => alert('View document functionality')}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => alert('Download document functionality')}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => alert('Delete document functionality')}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={() => alert('Create folder functionality')}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Folder
        </Button>
        <Button variant="outline" onClick={() => alert('Download all documents functionality')}>
          <Download className="h-4 w-4 mr-2" />
          Download All
        </Button>
        <Button variant="outline" onClick={() => alert('Export document list functionality')}>
          Export Document List
        </Button>
      </div>
    </div>
  );
}
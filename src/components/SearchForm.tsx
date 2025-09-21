import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NLPSearchForm from "./NLPSearchForm";
import AdvancedSearchForm from "./AdvancedSearchForm";

const SearchForm = () => {
  const [activeTab, setActiveTab] = useState("nlp");

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="nlp" className="text-sm">
            🤖 Natural Language
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-sm">
            ⚙️ Advanced Search
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="nlp">
          <NLPSearchForm />
        </TabsContent>
        
        <TabsContent value="advanced">
          <AdvancedSearchForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchForm;
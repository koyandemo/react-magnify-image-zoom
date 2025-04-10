
import { useState } from "react";
import ImageMagnifier from "@/components/ImageMagnifier";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Maximize } from "lucide-react";

const productImages = [
  "/sample-product.jpg",
  "/placeholder.svg",
  "/placeholder.svg",
];

const Index = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % productImages.length);
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Image Magnifier</h1>
          <p className="text-gray-600 mt-2">
            Hover over the image to see a magnified view - just like on Alibaba!
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="relative mb-4">
                <div className="aspect-square w-full bg-white rounded-lg overflow-hidden">
                  <ImageMagnifier 
                    src={productImages[activeImageIndex]} 
                    zoomLevel={2.5}
                    magnifierSize={180}
                    className="w-full h-full"
                  />
                </div>
                
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                  <Button 
                    onClick={prevImage} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                  <Button 
                    onClick={nextImage} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 justify-center">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative h-16 w-16 rounded border-2 overflow-hidden transition-all ${
                      index === activeImageIndex ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">How To Use</h2>
              
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 p-2 rounded-full">
                    <Maximize className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Desktop:</p>
                    <p>Hover your mouse cursor over the image to see a magnified view that follows your cursor.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 p-2 rounded-full">
                    <Maximize className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Mobile:</p>
                    <p>Tap on the image to toggle the full-screen magnified view.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-blue-100 p-2 rounded-full">
                    <ArrowLeft className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Gallery Navigation:</p>
                    <p>Use the arrow buttons or thumbnail images to navigate between product images.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;

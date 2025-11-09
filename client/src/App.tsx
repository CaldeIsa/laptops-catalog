import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import OperatingSystems from "./pages/OperatingSystems";
import OSDetail from "./pages/OSDetail";
import ScreenSizes from "./pages/ScreenSizes";
import ScreenSizeDetail from "./pages/ScreenSizeDetail";
import Processors from "./pages/Processors";
import ProcessorDetail from "./pages/ProcessorDetail";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/brands"} component={Brands} />
      <Route path={"/brands/:slug"} component={BrandDetail} />
      <Route path={"/operating-systems"} component={OperatingSystems} />
      <Route path={"/operating-systems/:slug"} component={OSDetail} />
      <Route path={"/screen-sizes"} component={ScreenSizes} />
      <Route path={"/screen-sizes/:slug"} component={ScreenSizeDetail} />
      <Route path={"/processors"} component={Processors} />
      <Route path={"/processors/:slug"} component={ProcessorDetail} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

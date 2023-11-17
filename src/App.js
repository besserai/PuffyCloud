import './App.css';
// import AirtableElememt from './AirtableAccess';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import HubFilter from './components/HubFilter/HubFilter';

const theme = createTheme({
  palette: {
    primary: {
      // light: '#757ce8',
      main: '#ef41c4',
      // dark: '#002884',
      // contrastText: '#fff',
    },
    secondary: {
      // light: '#ff7961',
      main: '#c441ef',
      // dark: '#ba000d',
      // contrastText: '#000',
    },
  },
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <HubFilter />
        {/* <AirtableElememt /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;

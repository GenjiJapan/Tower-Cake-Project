import MyContext from './MyContext.js';
import useExitPrompt from './useExitPrompt.js';

export default function App() {
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

  return (
    <div className="App">
      <MyContext.Provider value={{showExitPrompt, setShowExitPrompt}}>
        <MyMainApp />
      </MyContext.Provider>
    </div>
  );
}

export default function MyComponent() {
  const { showExitPrompt, setShowExitPrompt } = useContext(MyContext);

  //NOTE: this works similar to componentWillUnmount()
  useEffect(() => {
    return () => {
      setShowExitPrompt(false);
    }
  }, [])

  return (
    <div>{/* your code */}</div>
  );
}
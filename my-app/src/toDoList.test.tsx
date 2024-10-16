import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";

describe('renders list', () => {
    test('renders without crashing', () => {
        render(<ToDoList />);

        const createNoteButton = screen.getByText("Items bought: 0");
        expect(createNoteButton).toBeInTheDocument();
    });
  
    test('displays items', () => {
        render(<ToDoList />);
        const items = ['Apples', 'Bananas']; 
        items.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
        });
      });
    
      test('counts checked items correctly', () => {
        render(<ToDoList/>);
    
        const applesCheckbox = screen.getByTestId(`check-button-Apples`);
        fireEvent.click(applesCheckbox);
        
        // Check if the count is updated correctly
        expect(screen.getByText(/Items bought:/i)).toHaveTextContent('Items bought: 1');
        
        // Check and mark the second item as purchased
        const bananasCheckbox = screen.getByTestId(`check-button-Bananas`);
        fireEvent.click(bananasCheckbox);

        // Check if the count is updated correctly
        expect(screen.getByText(/Items bought:/i)).toHaveTextContent('Items bought: 2');

      });
  });
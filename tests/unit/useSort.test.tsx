import { render, screen, fireEvent } from "@testing-library/react";
import useSort from "@/hooks/useSort";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import tokensReducer from "@/store/tokensSlice";

const Harness = () => {
  const { field, direction, onToggleSort } = useSort();

  return (
    <div>
      <span data-testid="field">{field}</span>
      <span data-testid="direction">{direction}</span>
      <button onClick={() => onToggleSort("price")} data-testid="toggle">
        Toggle price
      </button>
    </div>
  );
};

const setup = () =>
  configureStore({
    reducer: {
      tokens: tokensReducer,
    },
  });

describe("useSort hook", () => {
  it("toggles direction when same field is selected", () => {
    const store = setup();
    render(
      <Provider store={store}>
        <Harness />
      </Provider>,
    );

    expect(screen.getByTestId("field").textContent).toBe("liquidityUSD");
    fireEvent.click(screen.getByTestId("toggle"));
    expect(screen.getByTestId("field").textContent).toBe("price");
    expect(screen.getByTestId("direction").textContent).toBe("desc");

    fireEvent.click(screen.getByTestId("toggle"));
    expect(screen.getByTestId("direction").textContent).toBe("asc");
  });
});

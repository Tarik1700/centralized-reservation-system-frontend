import { act, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import RestaurantsCard from "./RestaurantsCard";
import axios from "axios";

const queryClient = new QueryClient();

jest.mock("axios");

describe("RestaurantsCard", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it("renders loading spinner when data is being fetched", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <RestaurantsCard cardType="Type A" />
        </Router>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders 'You do not have any restaurant added!' message when no restaurants are found", async () => {
    const mockErrorResponse = {
      message: "Network Error",
      name: "AxiosError",
      code: "ERR_NETWORK",
      config: {
        // ...
      },
      request: new XMLHttpRequest(),
    };

    axios.get = jest.fn().mockRejectedValue(mockErrorResponse);

    render(
      <QueryClientProvider client={queryClient}>
        <Router>
          <RestaurantsCard cardType="Type B" />
        </Router>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loader")).toBeInTheDocument();
    });

    await waitFor(() => {
      const message = screen.queryByText(
        /You do not have any restaurant added/i
      );
      expect(message).toBeInTheDocument();
    });
  });
});

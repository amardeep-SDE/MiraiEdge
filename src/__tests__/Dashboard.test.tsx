import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Dashboard Page", () => {
  it("renders dashboard cards after API success", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@test.com", website: "site.com" },
      { id: 2, name: "Jane Doe", email: "jane@test.com", website: "demo.com" },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<Dashboard />);

    expect(screen.getAllByRole("generic").length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.getByText("Total Users")).toBeInTheDocument();

      expect(screen.getByText("Active Users")).toBeInTheDocument();

      expect(screen.getByText("Unique Domains")).toBeInTheDocument();

      expect(screen.getByText("Total Websites")).toBeInTheDocument();
    });
  });
});

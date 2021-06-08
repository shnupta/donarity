import { render, screen } from '@testing-library/react';

import Home from '../../pages/examples/test-example';

/**
 * @jest-environment jsdom 
 */

describe("Home page", () => {
    it("should render", () => {
        render(<Home />);
        const main = screen.getByText("Hello world!");
        expect(main).toBeInTheDocument();
    });
});
import { render, screen } from '@testing-library/react';

import CharitySummary from '../../components/charity-summary';

/**
 * @jest-environment jsdom || node 
 */

describe("CharitySummary", () => {
    it("should render the correct charity description", () => {
        const charity = {
                        id: "69",
                        name:"test-charity", 
                        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imperial.ac.uk%2F&psig=AOvVaw0wBBQ9owxju0qZkEU3QlGa&ust=1623233792418000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMio2Z_nh_ECFQAAAAAdAAAAABAD",
                        description: "hello world!"
                        }
        render(<CharitySummary charity={charity} />);

        expect(screen.getByText("hello world!")).toBeInTheDocument();
    });
});
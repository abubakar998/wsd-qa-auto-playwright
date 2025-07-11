import { test, expect } from '@playwright/test';
import { Flight } from '../../pages/flight';
import { AirTickets } from '../../pages/air-tickets';

test.describe('Air Ticket Flow', {tag: ['@ui-v1']}, () => {

    test('flight search and inspect price', async ({ page }) => {
        const airTickets = new AirTickets(page);
        const flight = new Flight(page);
        await airTickets.goto();
        await expect(airTickets.oneWayButton).toHaveAttribute('aria-selected', 'true');

        // select From: Chattogram
        await airTickets.flyingFrom.click();
        await airTickets.leavingFromInput.fill('Chattogram');
        await airTickets.leavingFromList.click();
        // await page.waitForTimeout(2000);
        // await page.pause();

        // select To: Dhaka
        await airTickets.flyingTo.click();
        await expect(airTickets.arrivalToInput).toBeVisible();

        await airTickets.arrivalToInput.fill('Dhaka');
        await airTickets.arrivalToList.click();

        // select Journey Date: 23 September, 2025 Sep 17, 2025
        await airTickets.journeyDate.fill('Sep 17, 2025');
        expect(airTickets.journeyDate).toHaveValue('Sep 17, 2025');
        // await page.waitForTimeout(2000);
        // await airTickets.nextMonthBtn.click();
        // await page.waitForTimeout(2000);
        // await airTickets.nextMonthBtn.click();
        // await airTickets.selectDateByText('23');
            
        // select Traveler, Class: 2 Adult, Premium Economy
        await airTickets.travelerClass.click();
        await airTickets.selectPreferredClassByText('Premium Economy').click();
        await expect(airTickets.selectPreferredClassByText('Premium Economy')).toHaveClass(/active/);
        await airTickets.travelerAdultPlusBtn.click();
        await expect(airTickets.travelerAdults.locator('p')).toHaveText('2');
        await airTickets.travelerDoneBtn.click();
        await page.waitForTimeout(2000);

        // click Search Flights button 
        await airTickets.searchBtn.click();

        // assert page redirects to flight search results
        await expect(page).toHaveURL(/.*flight.*/);
    });
});

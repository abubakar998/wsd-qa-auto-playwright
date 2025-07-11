import { Page, Locator } from '@playwright/test';

export class AirTickets {
    readonly page: Page;
    readonly navFlightTab: Locator;
    readonly oneWayButton: Locator;
    readonly oneTab: Locator;
    readonly flyingFrom: Locator;
    readonly flyingTo: Locator;
    readonly journeyDate: Locator;  
    readonly travelerClass: Locator;
    readonly leavingFromInput: Locator;
    readonly leavingFromList: Locator;
    readonly arrivalToInput: Locator;
    readonly arrivalToList: Locator;
    readonly nextMonthBtn: Locator;
    readonly travelerAdults: Locator;
    readonly travelerAdultPlusBtn: Locator;
    readonly travelerDoneBtn: Locator;
    readonly searchBtn: Locator;

constructor(page: Page) {
    this.page = page;
    this.navFlightTab = page.locator('[aria-labelledby="nav-flight-tab"]');
    this.oneWayButton = page.locator('[aria-controls="one-tab-pane"]');
    this.oneTab = page.locator('[aria-labelledby="one-tab"]');
    this.flyingFrom = this.oneTab.locator('level', { hasText: "Flying From" });
    this.flyingTo = this.oneTab.locator('level', { hasText: "Flying To" });
    this.journeyDate = this.oneTab.locator('[class*="react-datepicker__input"] input');
    this.travelerClass = this.oneTab.locator('level', { hasText: "Traveler, Class" });
    this.leavingFromInput = this.oneTab.locator('[placeholder="Leaving From"]'); 
    this.leavingFromList = this.leavingFromInput.locator('xpath=following-sibling::div[contains(@class, "item_box")]').locator('span:has-text("Chattogram")').first();
    
    this.arrivalToInput = this.oneTab.locator('[placeholder="Arrival To"]');
    this.arrivalToList = this.arrivalToInput.locator('xpath=following-sibling::div[contains(@class, "item_box")]').locator('span:has-text("Dhaka")').first();

    this.nextMonthBtn = this.oneTab.locator('[aria-label="Next Month"]');
    this.travelerAdults = this.oneTab.locator('[class*="traveler-input-box "]').first();
    this.travelerAdultPlusBtn = this.travelerAdults.locator('[value="+"]');
    this.travelerDoneBtn = this.oneTab.locator('[class*="traveler_done_btn"]');
    this.searchBtn = this.oneTab.locator(' [class*="search_btn"]');

}

async goto() {
    await this.page.goto('/air-tickets');
}

// selectDateByText(text: string): Locator {
//     return this.oneTab.locator('[role="option"]', { hasText: text });
// }

selectPreferredClassByText(text: string): Locator {
    return this.oneTab.locator('[class*="traveler_btn"]').filter({
        hasText: new RegExp(`^${text}$`)
    });
}
}

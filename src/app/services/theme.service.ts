import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ThemeService {
    front! : HTMLLinkElement;
    front3! : HTMLLinkElement;
    light! : HTMLLinkElement;
    dark! : HTMLLinkElement;

    constructor() { 
        this.front = document.getElementById('front-page-theme') as HTMLLinkElement;
        this.front3 = document.getElementById('front-third-party-theme') as HTMLLinkElement;
        this.light = document.getElementById('light-theme') as HTMLLinkElement;
        this.dark = document.getElementById('dark-theme') as HTMLLinkElement;
    }

    initFrontTheme() {
        this.front3.disabled = false;
        this.front.disabled = false;
        this.dark.disabled = true;
        this.light.disabled = true;
    }

    initLoginTheme() {
        this.front3.disabled = true;
        this.front.disabled = true;
        this.dark.disabled = true;
        this.light.disabled = false;
    }

    changeTheme(isDarkMode : boolean) {
        this.front3.disabled = true;
        this.front.disabled = true;
        this.dark.disabled = !isDarkMode;
        this.light.disabled = isDarkMode;
    }
}
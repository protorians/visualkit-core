import {RuleKit, ScreenKit} from "../foundation";
import {IRuleKitDetails} from "../types";


export function nsMiniPhoneRuleKit() {

  return new RuleKit({
    namespace: 'mini-phone',
    transform(): IRuleKitDetails {
      return {
        '@media': `${ScreenKit.mediaQuery('miniPhone')}`,
      }
    }
  })
}

export function nsPhoneRuleKit() {
  return new RuleKit({
    namespace: 'phone',
    transform(): IRuleKitDetails {
      return {
        '@media': `${ScreenKit.mediaQuery('phone')}`,
      }
    }
  })
}

export function nsTabletRuleKit() {
  return new RuleKit({
    namespace: 'tablet',
    transform(): IRuleKitDetails {
      return {
        '@media': `${ScreenKit.mediaQuery('tablet')}`,
      }
    }
  })
}

export function nsLaptopRuleKit() {
  return new RuleKit({
    namespace: 'laptop',
    transform(): IRuleKitDetails {
      return {
        '@media': `${ScreenKit.mediaQuery('laptop')}`,
      }
    }
  })
}

export function nsDesktopRuleKit() {
  return new RuleKit({
    namespace: 'desktop',
    transform(): IRuleKitDetails {
      return {
        '@media': `${ScreenKit.mediaQuery('desktop')}`,
      }
    }
  })
}

export function nsTvRuleKit() {
  return new RuleKit({
    namespace: 'tv',
    transform(): IRuleKitDetails {
      return {
        '@media': `${ScreenKit.mediaQuery('tv')}`,
      }
    }
  })
}
import {NamespaceRuleKit} from "../supports";
import {IRuleKitDetails} from "../types";


export function nsMiniPhoneRuleKit() {
  return new NamespaceRuleKit({
    namespace: 'min-phone',
    transform({value}): IRuleKitDetails {
      return {
        media: '(max-width:320px)',
        value,
      }
    }
  })
}

export function nsPhoneRuleKit() {
  return new NamespaceRuleKit({
    namespace: 'phone',
    transform({value}): IRuleKitDetails {
      return {
        media: '(min-width:320px) and (max-width:480px)',
        value,
      }
    }
  })
}

export function nsDesktopRuleKit() {
  return new NamespaceRuleKit({
    namespace: 'desktop',
    transform({value}): IRuleKitDetails {
      return {
        media: '(min-width:1025px) and (max-width:1200px)',
        value,
      }
    }
  })
}

export function nsLaptopRuleKit() {
  return new NamespaceRuleKit({
    namespace: 'mobile',
    transform({value}): IRuleKitDetails {
      return {
        media: '(min-width:769px) and (max-width:1024px)',
        value,
      }
    }
  })
}

export function nsTabletRuleKit() {
  return new NamespaceRuleKit({
    namespace: 'tablet',
    transform({value}): IRuleKitDetails {
      return {
        media: '(min-width:481px) and (max-width:768px)',
        value,
      }
    }
  })
}

export function nsTvRuleKit() {
  return new NamespaceRuleKit({
    namespace: 'desktop',
    transform({value}): IRuleKitDetails {
      return {
        media: '(min-width:1201px)',
        value,
      }
    }
  })
}
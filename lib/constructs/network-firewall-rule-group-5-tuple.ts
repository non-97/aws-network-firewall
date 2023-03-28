// 1. HTTPのみ

import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export interface NetworkFirewallRuleGroup5TupleProps {}

export class NetworkFirewallRuleGroup5Tuple extends Construct {
  readonly ruleGroup: cdk.aws_networkfirewall.CfnRuleGroup;

  constructor(
    scope: Construct,
    id: string,
    props?: NetworkFirewallRuleGroup5TupleProps
  ) {
    super(scope, id);

    // Network Firewall rule group
    this.ruleGroup = new cdk.aws_networkfirewall.CfnRuleGroup(this, "Default", {
      capacity: 100,
      ruleGroupName: "network-firewall-rule-group-5-tuple",
      type: "STATEFUL",
      ruleGroup: {
        rulesSource: {
          statefulRules: [
            {
              action: "PASS",
              header: {
                destination: "$EXTERNAL_NET",
                destinationPort: "443",
                direction: "FORWARD",
                protocol: "TLS",
                source: "$HOME_NET",
                sourcePort: "ANY",
              },
              ruleOptions: [
                {
                  keyword: `msg:"TLS/443 pass"`,
                },
                {
                  keyword: "sid:1000001",
                },
                {
                  keyword: "rev:1",
                },
              ],
            },
            {
              action: "REJECT",
              header: {
                destination: "$EXTERNAL_NET",
                destinationPort: "80",
                direction: "FORWARD",
                protocol: "HTTP",
                source: "$HOME_NET",
                sourcePort: "ANY",
              },
              ruleOptions: [
                {
                  keyword: `msg:"HTTP/80 reject"`,
                },
                {
                  keyword: "sid:1000002",
                },
                {
                  keyword: "rev:1",
                },
              ],
            },
          ],
        },
        statefulRuleOptions: {
          ruleOrder: "STRICT_ORDER",
        },
      },
    });
  }
}

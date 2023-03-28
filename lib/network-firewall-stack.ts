import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Vpc } from "./constructs/vpc";
import { Ec2Instance } from "./constructs/ec2-instance";
import { NetworkFirewall } from "./constructs/network-firewall";

export class NetworkFirewallStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc(this, "Vpc");

    // EC2 Instance
    new Ec2Instance(this, "Ec2 Instance A", {
      vpc: vpc.vpc,
    });

    // Network Firewall
    new NetworkFirewall(this, "Network Firewall", {
      vpc: vpc.vpc,
    });
  }
}

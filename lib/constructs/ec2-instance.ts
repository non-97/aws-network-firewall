import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export interface Ec2InstanceProps {
  vpc: cdk.aws_ec2.IVpc;
}

export class Ec2Instance extends Construct {
  readonly instance: cdk.aws_ec2.IInstance;

  constructor(scope: Construct, id: string, props: Ec2InstanceProps) {
    super(scope, id);

    // EC2 Instance
    this.instance = new cdk.aws_ec2.Instance(this, "Default", {
      machineImage: cdk.aws_ec2.MachineImage.fromSsmParameter(
        "/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-6.1-x86_64"
      ),
      instanceType: new cdk.aws_ec2.InstanceType("t3.micro"),
      vpc: props.vpc,
      vpcSubnets: props.vpc.selectSubnets({
        subnetGroupName: "Egress",
      }),
      blockDevices: [
        {
          deviceName: "/dev/xvda",
          volume: cdk.aws_ec2.BlockDeviceVolume.ebs(8, {
            volumeType: cdk.aws_ec2.EbsDeviceVolumeType.GP3,
          }),
        },
      ],
      propagateTagsToVolumeOnCreation: true,
      ssmSessionPermissions: true,
    });
  }
}

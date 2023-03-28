#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { NetworkStack } from "../lib/network-stack";

const app = new cdk.App();
new NetworkStack(app, "NetworkStack");

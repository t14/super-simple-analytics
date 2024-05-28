#!/usr/bin/env ts-node
import { lambdaHandler } from "../src/index";
import apiGatewayHttpApiPorxy from "../src/events/apiGateway";

// eslint-disable-next-line no-console
lambdaHandler(apiGatewayHttpApiPorxy).catch(console.error);

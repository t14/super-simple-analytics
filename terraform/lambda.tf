resource "aws_lambda_function" "lambda" {
  function_name = var.app_name
  filename      = "../backend/build/${var.app_name}.zip"
  handler       = "../backend/build/dist/src/index.lambdaHandler"
  source_code_hash = filebase64sha256("../backend/build/${var.app_name}.zip")
  runtime       = "nodejs16.x"
  role = aws_iam_role.lambda_exec.arn
  environment {
    variables = {
      TABLE_NAME = var.app_name
      FRONTEND_URL = var.frontend_url
    }
  }
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.api_gateway.execution_arn}/*/*"
}
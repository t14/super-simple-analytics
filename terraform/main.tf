variable region {}
variable aws_profile {}
variable app_name {}
variable frontend_url {}
variable dynamoDB_write_capacity {}
variable dynamoDB_read_capacity {}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = var.region
  profile = var.aws_profile
}


# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = "${var.app_name}_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "lambda_dynamo" {
  name = "${var.app_name}_lambda_policy"
  role = aws_iam_role.lambda_exec.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement":[{
    "Effect": "Allow",
    "Action": [
     "dynamodb:BatchGetItem",
     "dynamodb:GetItem",
     "dynamodb:Query",
     "dynamodb:Scan",
     "dynamodb:BatchWriteItem",
     "dynamodb:PutItem",
     "dynamodb:UpdateItem"
    ],
    "Resource": "${aws_dynamodb_table.dynamodb-table.arn}"
   }
  ]
}
EOF

}

resource "aws_iam_role_policy_attachment" "basic" {
policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
role       = aws_iam_role.lambda_exec.name
}

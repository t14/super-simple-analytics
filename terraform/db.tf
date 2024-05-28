resource "aws_db_instance" "default" {
  allocated_storage           = 10
  db_name                     = "Analytics"
  engine                      = "mysql"
  engine_version              = "5.7"
  instance_class              = "db.t3.micro"
  username                    = "foo"
  manage_master_user_password = true
  parameter_group_name        = "default.mysql5.7"
  skip_final_snapshot         = true
}
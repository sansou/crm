import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dynamoose from 'dynamoose';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  
  const ddb = new dynamoose.aws.ddb.DynamoDB({
    credentials: {
      accessKeyId: process?.env?.AWS_ACCESS_KEY_ID,
      secretAccessKey: process?.env?.AWS_ACCESS_SECRET
    },
    region: process?.env?.AWS_REGION
  });

  dynamoose.aws.ddb.local();
}
bootstrap();

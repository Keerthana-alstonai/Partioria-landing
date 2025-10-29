from django.db import migrations, models

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('state', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'locations',
            },
        ),
        migrations.AlterUniqueTogether(
            name='location',
            unique_together={('state', 'city')},
        ),
    ]
from rest_framework import serializers
from .models import ContactMessage, Project, Skill, Certification, Education, AnalyticsEvent

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'subject',
            'message',
            'inquiry_type',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def validate_message(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("Message must contain at least 5 characters.")
        return value


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Skill
        fields = [
            'id',
            'name',
            'category',
            'category_display',
            'proficiency',
            'level',
            'description',
            'order'
        ]


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class AnalyticsEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsEvent
        fields = '__all__'
        read_only_fields = ['id', 'created_at']

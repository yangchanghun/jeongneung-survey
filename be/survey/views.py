from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
from django.http import HttpResponse
import csv

from .models import TimeBankSurvey
from .serializers import TimeBankSurveySerializer, TimeBankSurveyListSerializer


@api_view(['GET', 'POST'])
def survey_list_create(request):
    """
    설문조사 목록 조회 (GET) 및 생성 (POST)
    """
    if request.method == 'GET':
        # 목록 조회
        surveys = TimeBankSurvey.objects.all()
        serializer = TimeBankSurveyListSerializer(surveys, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # 설문조사 생성
        serializer = TimeBankSurveySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': '설문에 참여해 주셔서 감사합니다!',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def survey_detail(request, pk):
    """
    특정 설문조사 조회 (GET), 수정 (PUT), 삭제 (DELETE)
    """
    try:
        survey = TimeBankSurvey.objects.get(pk=pk)
    except TimeBankSurvey.DoesNotExist:
        return Response({
            'error': '설문조사를 찾을 수 없습니다.'
        }, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        # 조회
        serializer = TimeBankSurveySerializer(survey)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        # 수정
        serializer = TimeBankSurveySerializer(survey, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        # 삭제
        survey.delete()
        return Response({
            'message': '설문조사가 삭제되었습니다.'
        }, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def survey_statistics(request):
    """
    설문조사 통계 조회
    """
    total_count = TimeBankSurvey.objects.count()
    
    # 시간은행 인지 여부 통계
    awareness_stats = TimeBankSurvey.objects.values('knows_timebank').annotate(
        count=Count('id')
    )
    
    # 연령대별 통계
    age_stats = TimeBankSurvey.objects.values('age_group').annotate(
        count=Count('id')
    )
    
    # 성별 통계
    gender_stats = TimeBankSurvey.objects.values('gender').annotate(
        count=Count('id')
    )
    
    # 거주지 통계
    residence_stats = TimeBankSurvey.objects.values('residence').annotate(
        count=Count('id')
    )
    
    # 받고 싶은 도움 통계
    help_receive_stats = TimeBankSurvey.objects.values('help_receive').annotate(
        count=Count('id')
    )
    
    # 줄 수 있는 도움 통계
    help_give_stats = TimeBankSurvey.objects.values('help_give').annotate(
        count=Count('id')
    )
    
    # 참여 시간 통계
    time_commitment_stats = TimeBankSurvey.objects.values('time_commitment').annotate(
        count=Count('id')
    )
    
    # 지원 네트워크 통계
    support_network_stats = TimeBankSurvey.objects.values('support_network').annotate(
        count=Count('id')
    )
    
    # 참여 형태 통계
    participation_type_stats = TimeBankSurvey.objects.values('participation_type').annotate(
        count=Count('id')
    )
    
    # 기대 사항 통계
    expectation_stats = TimeBankSurvey.objects.values('expectation').annotate(
        count=Count('id')
    )
    
    return Response({
        'total_count': total_count,
        'awareness': list(awareness_stats),
        'age_group': list(age_stats),
        'gender': list(gender_stats),
        'residence': list(residence_stats),
        'help_receive': list(help_receive_stats),
        'help_give': list(help_give_stats),
        'time_commitment': list(time_commitment_stats),
        'support_network': list(support_network_stats),
        'participation_type': list(participation_type_stats),
        'expectation': list(expectation_stats),
    })


# @api_view(['GET'])
# def survey_export_csv(request):
#     """
#     CSV 형식으로 데이터 내보내기
#     """
#     response = HttpResponse(content_type='text/csv; charset=utf-8')
#     response['Content-Disposition'] = 'attachment; filename="timebank_survey.csv"'
    
#     # UTF-8 BOM 추가 (엑셀에서 한글 깨짐 방지)
#     response.write('\ufeff')
    
#     writer = csv.writer(response)
    
#     # 헤더 작성
#     writer.writerow([
#         'ID',
#         '1번 시간은행 인지',
#         '2번 받고 싶은 도움',
#         # '2번 받고 싶은 도움(기타)',
#         '3번 줄 수 있는 도움',
#         # '3번 줄 수 있는 도움(기타)',
#         '4번 참여 시간',
#         # '4번 참여 시간(기타)',
#         '5번 급할 때 연락 가능한 사람',
#         '6번 참여 형태',
#         '7번 기대 사항',
#         # '7번 기대 사항(기타)',
#         '8번 연령대',
#         '9번 성별',
#         '10번 거주지',
#         '작성일',
#         '작성시간',
#     ])
    
    
        


#     # 데이터 작성
#     for survey in TimeBankSurvey.objects.all():
#         받고싶은도움 = ""
#         if survey.get_help_receive_display() == "기타":
#             받고싶은도움 = "기타"+"("+survey.help_receive_other+")"
#         else:
#             받고싶은도움 = survey.get_help_receive_display()

#         줄수있는도움= ""
#         if survey.get_help_give_display() == "기타":
#             줄수있는도움 = "기타"+"("+survey.help_give_other+")"
#         else:
#             줄수있는도움 = survey.get_help_give_display()


#         참여시간 = ""
#         if survey.get_time_commitment_display() == "기타":
#             참여시간 = "기타"+"("+survey.time_commitment_other+")"
#         else:
#             참여시간 = survey.get_time_commitment_display()

#         기대사항 = ""
#         if survey.get_expectation_display() == "기타":
#             기대사항 = "기타"+"("+survey.expectation_other+")"
#         else:
#             기대사항 = survey.get_expectation_display()


#         writer.writerow([
#             survey.id, # 번호
#             survey.get_knows_timebank_display(), #시간
#             # survey.get_help_receive_display(), 
#             받고싶은도움, #받고싶은 도움
#             # survey.help_receive_other or '',
#             # survey.get_help_give_display(),
#             줄수있는도움, #줄 수 있는 도움
#             # survey.help_give_other or '',
#             # survey.get_time_commitment_display(),
#             참여시간, # 참여시간
#             # survey.time_commitment_other or '',
#             survey.get_support_network_display(), #급할때 연락가능한사람
#             survey.get_participation_type_display(), #참여 형태
#             # survey.get_expectation_display(),
#             기대사항, #기대사항
#             # survey.expectation_other or '',
#             survey.get_age_group_display(), # 연령대
#             survey.get_gender_display(), # 성별
#             survey.get_residence_display(), # 거주지
#             survey.created_at.strftime('%m-%d'),    # 2025-11-03
#             survey.created_at.strftime('%H:%M:%S')     # 00:42:30
#         ])
    
#     return response
from django.utils import timezone  # 상단에 추가!

@api_view(['GET'])
def survey_export_csv(request):
    """
    CSV 형식으로 데이터 내보내기
    """
    response = HttpResponse(content_type='text/csv; charset=utf-8')
    response['Content-Disposition'] = 'attachment; filename="timebank_survey.csv"'
    
    # UTF-8 BOM 추가 (엑셀에서 한글 깨짐 방지)
    response.write('\ufeff')
    
    writer = csv.writer(response)
    
    # 헤더 작성
    writer.writerow([
        'ID',
        '1번 시간은행 인지',
        '2번 받고 싶은 도움',
        '3번 줄 수 있는 도움',
        '4번 참여 시간',
        '5번 급할 때 연락 가능한 사람',
        '6번 참여 형태',
        '7번 기대 사항',
        '8번 연령대',
        '9번 성별',
        '10번 거주지',
        '작성일',
        '작성시간',
    ])
    
    # 데이터 작성
    for survey in TimeBankSurvey.objects.all():
        # 한국 시간으로 변환 ✅
        local_time = timezone.localtime(survey.created_at)
        
        # 받고 싶은 도움
        받고싶은도움 = ""
        if survey.get_help_receive_display() == "기타":
            if survey.help_receive_other:  # ✅ None 체크
                받고싶은도움 = f"기타({survey.help_receive_other})"
            else:
                받고싶은도움 = "기타"
        else:
            받고싶은도움 = survey.get_help_receive_display()

        # 줄 수 있는 도움
        줄수있는도움 = ""
        if survey.get_help_give_display() == "기타":
            if survey.help_give_other:  # ✅ None 체크
                줄수있는도움 = f"기타({survey.help_give_other})"
            else:
                줄수있는도움 = "기타"
        else:
            줄수있는도움 = survey.get_help_give_display()

        # 참여 시간
        참여시간 = ""
        if survey.get_time_commitment_display() == "기타":
            if survey.time_commitment_other:  # ✅ None 체크
                참여시간 = f"기타({survey.time_commitment_other})"
            else:
                참여시간 = "기타"
        else:
            참여시간 = survey.get_time_commitment_display()

        # 기대 사항
        기대사항 = ""
        if survey.get_expectation_display() == "기타":
            if survey.expectation_other:  # ✅ None 체크
                기대사항 = f"기타({survey.expectation_other})"
            else:
                기대사항 = "기타"
        else:
            기대사항 = survey.get_expectation_display()

        writer.writerow([
            survey.id,
            survey.get_knows_timebank_display(),
            받고싶은도움,
            줄수있는도움,
            참여시간,
            survey.get_support_network_display(),
            survey.get_participation_type_display(),
            기대사항,
            survey.get_age_group_display(),
            survey.get_gender_display(),
            survey.get_residence_display(),
            local_time.strftime('%m-%d'),      # ✅ 한국 시간으로 월-일
            local_time.strftime('%H:%M:%S'),   # ✅ 한국 시간으로 시:분:초
        ])
    
    return response
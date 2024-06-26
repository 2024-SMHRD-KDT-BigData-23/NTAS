package com.smhrd.namnam.controller;

import com.smhrd.namnam.entity.AdmissionInfo;
import com.smhrd.namnam.entity.CommentInfo;
import com.smhrd.namnam.entity.ResultWardInfo;
import com.smhrd.namnam.service.ERService;
import com.smhrd.namnam.vo.AdmissionInfoVO;
import com.smhrd.namnam.vo.CommentInfoVO;
import com.smhrd.namnam.vo.ERViewVO;
import com.smhrd.namnam.vo.ResultWardInfoVO;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ER")
public class ERController {

    @Autowired
    private ERService erService;

    //////////////////////////////////////////리스트 페이지(과거,현재)/////////////////////////////////////////
    // 응급실 진료 중인 환자들 전체 조회(각 입원코드마다 가장최신) / 현재, 과거 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @GetMapping("/patients/{pageStatus}/{bedward}/{deepNcdss}/{patientNameId}")
    @Operation(summary = "(응급실 진료 중인 환자들 전체 조회)/(현재,과거 입원 리스트 페이지에서 patient의 name, id에 대한 입원 내역 정보 검색)")
    public List<ERViewVO> findMedicalPatients(@PathVariable("pageStatus") String pageStatus, @PathVariable("bedward") String bedward, @PathVariable("deepNcdss") String deepNcdss,
                                              @PathVariable("patientNameId") String patientNameId) {
            return erService.findPatients(pageStatus, bedward, deepNcdss, patientNameId);
    }

    // result_ward 결정 유무 조회
    @GetMapping("/resultWard/{admissionId}")
    @Operation(summary = "(환자 result_ward 유무)")
    public ResponseEntity<ResultWardInfo> findResultWard(@PathVariable("admissionId") String admissionId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(erService.findResultWard(admissionId));
    }

    // 응급실 진료 후 result_ward 결정
    @PostMapping("/resultWards/{staffId}/{admissionId}")
    @Operation(summary = "(환자 result_ward 결정)")
    public ResponseEntity<ResultWardInfoVO> saveResultWard(@PathVariable("staffId") String staffId, @PathVariable("admissionId") String admissionId, @RequestBody ResultWardInfoVO vo) {
        ResultWardInfoVO savedResultWard = erService.saveResultWard(staffId, admissionId, vo);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedResultWard);
    }

    // 응급실 진료 후 comment 작성
    @PostMapping("/comments/{staffId}/{admissionId}")
    @Operation(summary = "(환자 comment 작성)")
    public ResponseEntity<CommentInfoVO> saveComment(@PathVariable("staffId") String staffId, @PathVariable("admissionId") String admissionId, @RequestBody CommentInfoVO vo) {
        CommentInfoVO savedComment = erService.saveComment(staffId, admissionId, vo);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComment);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////상세 페이지///////////////////////////////////////
    // 특정 입원코드에 대한 상세 정보
    @GetMapping("/patient-details/{admissionId}")
    @Operation(summary = "(특정 입원코드에 대한 상세 정보)")
    public List<ERViewVO> findPatientDetailsByAdmissionId(@PathVariable("admissionId") String admissionId) {
        return erService.findPatientDetailsByAdmissionId(admissionId);
    }

    // 특정 입원코드에 대한 배치 정보
    @GetMapping("/resultWards/{admissionId}")
    @Operation(summary = "(특정 입원코드에 대한 Result Ward 기록 정보)")
    public List<ResultWardInfoVO> findResultWardsByAdmissionId(@PathVariable("admissionId") String admissionId) {
        return erService.findResultWardsByAdmissionId(admissionId);
    }

    // 특정 입원코드에 대한 진단 정보
    @GetMapping("/comments/{admissionId}")
    @Operation(summary = "(특정 입원코드에 대한 Comment 기록 정보)")
    public List<CommentInfoVO> findCommentsByAdmissionId(@PathVariable("admissionId") String admissionId) {
        return erService.findCommentsByAdmissionId(admissionId);
    }
    ///////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////검색관련/////////////////////////////////////////////////
    // 검색페이지에서 patient의 name, id에 대한 입원 내역 정보 검색(각 입원코드마다 가장최신)
    @GetMapping("/search/patient-name-id/{patientNameId}")
    @Operation(summary = "(검색페이지에서 patient의 name, id에 대한 입원 내역 정보 검색)")
    public List<ERViewVO> searchByPatientNameId(@PathVariable("patientNameId") String patientNameId){
        return erService.searchByPatientNameId(patientNameId);
    }
    /////////////////////////////////////////////////////////////////////////////////////////

}




